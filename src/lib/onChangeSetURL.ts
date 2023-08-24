export default function onChangeSetURL(setUrlFunc: any, setLoadingFunc?: any) {
  return async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e?.target.files?.length) return;
    const files = e?.target.files;
    const file = files[0];

    if (files?.length > 1) {
      for (let i = 0; i < files.length; i++) {
        // const data = await imageUpload(files[i], setLoadingFunc);
        // (await setUrlFunc) && setUrlFunc(data?.url);
      }
    } else {
      // const data = await imageUpload(file, setLoadingFunc);
      // setUrlFunc && setUrlFunc(data?.url);
    }
  };
}
