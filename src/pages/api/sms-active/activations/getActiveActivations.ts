import Activation from "@/models/mongodb/Activation";
import { sms_active_request } from "../action/[action]";
import User from "@/models/mongodb/User";

export default async function getActiveActivations(stopInterval: () => void) {
  const { data } = await sms_active_request(
    {
      action: "getActiveActivations",
    },
    "GET"
  );

  // :: check any activations is running or not
  if (data?.error || data?.status === "error") {
    stopInterval();
    console.log("Interval stopped!");

    await Activation.updateMany(
      { status: "STATUS_WAIT_CODE" },
      {
        $set: {
          status: "STATUS_CANCEL",
        },
      }
    );

    return;
  } else {
    const activeActivations: ActiveActivation[] = data?.activeActivations || [];
    if (!activeActivations?.length) return;

    // check every active activation and update if sms_code has received!
    for (let i = 0; i < activeActivations?.length; i++) {
      const active = activeActivations[i];
      // :: check if code arrived then update code to database
      const found = await Activation.findOne({
        activationId: active?.activationId,
      });
      if (!found) return;

      if (active?.smsCode && active?.smsCode?.length > 0) {
        found.sms_code = active.smsCode;
        found.sms_text = active.smsText;
        found.status = "COMPLETED";
        await found.save();

        setTimeout(() => {
          Activation.findOneAndUpdate(
            {
              activationId: active?.activationId,
            },
            {
              $set: {
                status: "IN_HISTORY",
              },
            }
          ).then(() => {
            console.log("Moved to history");
          });
        }, 60000);

        console.log(`updatedActvID=${active?.activationId} - `, active.smsCode);
      } else if (found.status === "STATUS_WAIT_CODE") {
        const pastDate = new Date(found.createdAt as any) as any;
        const currentDate = new Date() as any;
        const minutesAgo = (currentDate - pastDate) / 60000;
        if (Number(minutesAgo) >= 20) {
          found.status = "STATUS_CANCEL";
          const user = await User.findById(found.user);
          if (user) {
            user.balance = (user?.balance || 0) + (found.total_cost || 0);
            await user.save();
          }
          await found.save();
        }
      }
    }
  }
}
