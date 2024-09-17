import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-700 mb-4">
            Welcome to Aneja Mall! Your privacy is important to us. This Privacy
            Policy outlines how we collect, use, and protect your information
            when you visit our website and use our services.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
            1. Information We Collect
          </h2>
          <p className="text-gray-700 mb-4">
            We collect personal information that you provide to us, such as your
            name, email address, and payment information when you make a
            purchase. We may also collect information about your browsing
            behavior and interactions with our website.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-700 mb-4">
            We use your information to process transactions, improve our
            website, and communicate with you about your orders and promotional
            offers. We may also use your information for internal analytics and
            to ensure the security of our website.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
            3. How We Protect Your Information
          </h2>
          <p className="text-gray-700 mb-4">
            We implement a variety of security measures to protect your personal
            information. Our website is secured with SSL encryption, and we
            regularly review and update our security practices.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
            4. Sharing Your Information
          </h2>
          <p className="text-gray-700 mb-4">
            We do not sell or rent your personal information to third parties.
            We may share your information with service providers who assist us
            in operating our website and processing transactions, but they are
            required to maintain the confidentiality of your information.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
            5. Your Choices
          </h2>
          <p className="text-gray-700 mb-4">
            You have the right to access, update, or delete your personal
            information. You can also opt-out of receiving promotional emails by
            following the unsubscribe instructions provided in the emails.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
            6. Changes to This Privacy Policy
          </h2>
          <p className="text-gray-700 mb-4">
            We may update this Privacy Policy from time to time. We will notify
            you of any significant changes by posting the updated policy on our
            website. Your continued use of our website constitutes your
            acceptance of the updated policy.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
            7. Contact Us
          </h2>
          <p className="text-gray-700 mb-4">
            If you have any questions or concerns about this Privacy Policy,
            please contact us at{" "}
            <a
              href="mailto:support@anejmall.com"
              className="text-blue-500 hover:underline"
            >
              Anejasarees@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
