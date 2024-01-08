import Terms from "./utils/terms-of-use.json";

export const TermsOfUse = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="leading-12 text-center text-5xl font-bold">
        Public Testnet Terms of Use
      </div>
      <div className="text-center text-lg font-semibold leading-7">
        Last updated: January 1, 2024
      </div>
      <div className="leading-6">
        These Public Testnet Terms of Use (these “<b>Terms</b>”) apply to your
        access to and use of the websites, platform, software, technologies,
        features, and other online products and services (collectively, the “
        <b>Services</b>
        ”) provided or made available by Berachain Corporation (the “
        <b>Company</b>
        ”, “<b>we</b>
        ”, “<b>our</b>” or “<b>us</b>
        ”) in connection with the Berachain protocol (the “<b>Protocol</b>
        ”) incentivized public testnet (the “<b>Testnet</b>
        ”).
      </div>
      <div className="text-center text-lg font-semibold leading-7">
        YOUR PARTICIPATION IN THE TESTNET IS ENTIRELY VOLUNTARY. IF YOU ARE
        PARTICIPATING IN THE TESTNET, YOU MUST STRICTLY ADHERE TO THESE TERMS.
      </div>
      <div className="text-sm leading-6">
        Please read these Terms carefully as it governs your use of the Testnet
        and the Services. These Terms contain important information, including a
        binding arbitration provision and a class action waiver, both of which
        impact your rights as to how disputes are resolved.
      </div>
      {Terms.content.map((term, index) => (
        <div key={index} className="flex flex-col gap-8">
          <div className="text-center text-2xl font-semibold leading-8">
            {index + 1}. {term.title}
          </div>
          <>
            {term.content.map((text, index) => (
              <div key={index} className="text-sm leading-6">
                {text}
              </div>
            ))}
          </>
        </div>
      ))}
    </div>
  );
};
