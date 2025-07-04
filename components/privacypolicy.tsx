import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto mt-8 px-4 py-8 text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-white">Privacy Notice</h1>
      <p className="text-sm text-gray-400 mb-4">Last updated November 01, 2018</p>

      <p className="mb-4">
        Thank you for choosing to be part of our community at DeadLive Ltd, doing business as DeadLive Ltd
        ("DeadLive Ltd", "we", "us", "our"). We are committed to protecting your personal information and your right
        to privacy. If you have any questions or concerns about our policy, or our practices with regards to your
        personal information, please contact us at <a className="text-blue-400 underline" href="mailto:jamesevents@live.com">jamesevents@live.com</a>.
      </p>

      <p className="mb-4">
        This privacy policy applies to all information collected through our website (
        <a className="text-blue-400 underline" href="https://www.deadlive.co.uk" target="_blank" rel="noopener noreferrer">
          www.deadlive.co.uk
        </a>
        ), and/or any related services, sales, marketing or events (we refer to them collectively in this privacy policy as the "Sites").
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Table of Contents</h2>
      <ol className="list-decimal list-inside space-y-1 text-blue-400">
        {[
          "WHAT INFORMATION DO WE COLLECT?",
          "HOW DO WE USE YOUR INFORMATION?",
          "WILL YOUR INFORMATION BE SHARED WITH ANYONE?",
          "DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?",
          "IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?",
          "HOW LONG DO WE KEEP YOUR INFORMATION?",
          "HOW DO WE KEEP YOUR INFORMATION SAFE?",
          "DO WE COLLECT INFORMATION FROM MINORS?",
          "WHAT ARE YOUR PRIVACY RIGHTS?",
          "CONTROLS FOR DO-NOT-TRACK FEATURES",
          "DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?",
          "DO WE MAKE UPDATES TO THIS NOTICE?",
          "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?",
        ].map((item, i) => (
          <li key={i}>
            <a href={`#section${i + 1}`} className="hover:underline">
              {i + 1}. {item}
            </a>
          </li>
        ))}
      </ol>

      <div className="mt-8 space-y-8">
        {/* Repeat for each section */}
        {[...Array(13)].map((_, i) => (
          <div id={`section${i + 1}`} key={i}>
            <h3 className="text-xl font-semibold mb-2 text-white">{i + 1}. {[
              "WHAT INFORMATION DO WE COLLECT?",
              "HOW DO WE USE YOUR INFORMATION?",
              "WILL YOUR INFORMATION BE SHARED WITH ANYONE?",
              "DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?",
              "IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?",
              "HOW LONG DO WE KEEP YOUR INFORMATION?",
              "HOW DO WE KEEP YOUR INFORMATION SAFE?",
              "DO WE COLLECT INFORMATION FROM MINORS?",
              "WHAT ARE YOUR PRIVACY RIGHTS?",
              "CONTROLS FOR DO-NOT-TRACK FEATURES",
              "DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?",
              "DO WE MAKE UPDATES TO THIS NOTICE?",
              "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?"
            ][i]}</h3>
            <p className="text-gray-300">
              {/* Replace this line with actual section content as per your full content */}
              In Short: [Replace this with the real summary for section {i + 1}.]
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6">
        <h4 className="text-lg font-semibold mb-2 text-white">Request Data Review or Deletion</h4>
        <p className="text-gray-300">
          To request to review, update, or delete your personal information, please submit a request form by clicking{' '}
          <a className="text-blue-400 underline" href="#">here</a>. We will respond within 30 days.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
