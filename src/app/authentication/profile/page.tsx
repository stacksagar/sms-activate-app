import FormikInput from "@/common/Forms/Formik/FormikInput";
import Input from "@/common/Forms/Input";
import Button from "@/common/Buttons/Button";
import ClientSidebar from "@/components/client/profile/ClientProfileSidebar";
import ClientHeader from "@/components/client/header/ClientHeader";
import ClientFooter from "@/components/client/footer/ClientFooter";

export const ProfileLayout = ({ children }: any) => {
  return (
    <>
      <ClientHeader />
      <div className="container py-20 flex lg:gap-8">
        <ClientSidebar />
        {children}
      </div>
      <ClientFooter />
    </>
  );
};

export default function UserProfile() {
  return (
    <ProfileLayout>
      <form className="w-full p-6 bg-white dark:bg-gray-800 space-y-6">
        <FormikInput label="Name" placeholder="Name" />
        <FormikInput label="Email Address" placeholder="Email Address" />
        <FormikInput required={false} label="Phone" placeholder="Phone" />

        <div>
          <FormikInput
            required={false}
            label="Profile Picture"
            placeholder="Profile Picture"
          />
          <Input type="file" />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </ProfileLayout>
  );
}
