import React from "react";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-700 mb-4">
            Welcome to Aneja Mall. These terms and conditions outline the rules
            and regulations for the use of our website. By accessing this
            website, we assume you accept these terms in full. Do not continue
            to use Aneja Mall if you do not accept all the terms and conditions
            stated on this page.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
            1. Use of the Website
          </h2>
          <p className="text-gray-700 mb-4">
            By using this website, you warrant that you are at least 18 years of
            age or accessing the website under the supervision of a parent or
            guardian. You are granted a limited, revocable, and non-exclusive
            right to use this website.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
            2. Account Responsibilities
          </h2>
          <p className="text-gray-700 mb-4">
            If you create an account on Aneja Mall, you are responsible for
            maintaining the confidentiality of your account and password and for
            restricting access to your computer. You agree to accept
            responsibility for all activities that occur under your account.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
            3. Prohibited Activities
          </h2>
          <p className="text-gray-700 mb-4">
            You are prohibited from using the website or its content for any
            unlawful purpose, to solicit others to perform or participate in any
            unlawful acts, or to violate any local, state, or international
            laws.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
            4. Intellectual Property
          </h2>
          <p className="text-gray-700 mb-4">
            All content included on this site, such as text, graphics, logos,
            images, and software, is the property of Aneja Mall and is protected
            by international copyright laws.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
            5. Limitation of Liability
          </h2>
          <p className="text-gray-700 mb-4">
            Aneja Mall will not be liable for any damages of any kind arising
            from the use of this site, including but not limited to direct,
            indirect, incidental, punitive, and consequential damages.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
            6. Termination
          </h2>
          <p className="text-gray-700 mb-4">
            We reserve the right to terminate or suspend access to our service
            immediately, without prior notice or liability, for any reason
            whatsoever.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
            7. Changes to Terms
          </h2>
          <p className="text-gray-700 mb-4">
            Aneja Mall reserves the right to update or modify these terms at any
            time without prior notice. Your use of the website following any
            such change constitutes your agreement to follow and be bound by the
            terms as changed.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
            8. Contact Us
          </h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about these Terms of Service, please
            contact us at{" "}
            <a
              href="mailto:Anejasarees@gmail.com"
              className="text-blue-500 hover:underline"
            >
              Anejasarees@gmail.com
            </a>
            .
          </p>

          <div className="mt-8">
            <p className="text-gray-700 mb-2">
              For more information, visit our:
            </p>
            <ul className="list-disc list-inside">
              <li>
                <Link
                  to="/privacy"
                  className="text-blue-600 hover:text-orange-600 transition duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/refund"
                  className="text-blue-600 hover:text-orange-600 transition duration-300"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
