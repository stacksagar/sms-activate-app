const PrivacyPolicy = () => {
  return (
    <div className="container py-10 md:py-20">
      <div className="mb-12 max-w-[750px] sm:mb-16 mx-auto text-center">
        <h2 className="mt-0 mb-3 text-2xl font-bold leading-tight xs:text-3xl sm:text-4xl sm:leading-tight md:text-[45px] md:leading-tight text-dark">
          Privacy Policy
        </h2>
        <p className="w-full text-base leading-relaxed text-body-color mx-auto">
          Your data is protected and respected.
        </p>
      </div>
      <div className="rounded-xl bg-white dark:bg-gray-800 p-6 sm:py-10 px-6 pb-5 shadow-features sm:p-[70px] sm:pb-8 md:p-10 md:pb-5 lg:p-[70px] lg:pb-8">
        <div className="pb-6">
          <h3 className="m-0 mb-3 text-2xl font-semibold text-dark sm:text-2xl">
            General Information
          </h3>
          <p className="mb-10 text-base leading-relaxed text-body-color">
            All of our registered users information ( Name, Email, Phone Number
            and Address ) are secure to us. We are committed to taking care of
            all information and we are promised to our customers that we are
            never going to share their information with anyone.
          </p>
          <p className="mb-8 text-base leading-relaxed text-body-color">
            Also, We do not store any credit card information in server, all
            payments are processed by world leading payment gateway PayPal and
            Paddle and our site is secured by SSL encryption.
          </p>
        </div>
        <div className="pb-6">
          <h3 className="m-0 mb-3 text-2xl font-semibold text-dark sm:text-2xl">
            What rights you have over your data
          </h3>
          <p className="text-base leading-relaxed text-body-color">
            If you have an account on this site, or have left comments, you can
            request to receive an exported file of the personal data we hold
            about you, including any data you have provided to us. You can also
            request that we erase any personal data we hold about you. This does
            not include any data we are obliged to keep for administrative,
            legal, or security purposes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
