import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions - YieldMax',
  description: 'Common questions about DeFi yield protocols and how YieldMax works'
};

export default function FAQPage() {
  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>

      <div className="faq-list">
        <div className="faq-item">
          <h2>What is YieldMax?</h2>
          <p>
            YieldMax is a platform that helps you compare and analyze different yield opportunities in the DeFi ecosystem.
            We aggregate data from various protocols to provide you with transparent information to make informed decisions.
          </p>
        </div>

        <div className="faq-item">
          <h2>How is APY calculated?</h2>
          <p>
            Annual Percentage Yield (APY) is the effective annual rate of return taking into account the effect of compounding interest.
            Each protocol may have slightly different methods of calculating APY based on their specific mechanisms and reward structures.
          </p>
        </div>

        <div className="faq-item">
          <h2>What are the risks involved?</h2>
          <p>
            DeFi protocols come with various risks including smart contract risk, market risk, liquidation risk, and more.
            Each protocol on YieldMax includes a risk assessment to help you understand the potential risks involved.
          </p>
        </div>

        <div className="faq-item">
          <h2>How often is the data updated?</h2>
          <p>
            We strive to keep our data as up-to-date as possible. Protocol information, APY rates, and risk assessments
            are updated regularly to reflect the current state of the markets.
          </p>
        </div>

        <div className="faq-item">
          <h2>How does the Yield Simulator work?</h2>
          <p>
            The Yield Simulator uses the current APY of a selected protocol and calculates potential returns over a specified
            time period based on your initial investment amount. It provides estimates for daily, monthly, and total yields.
          </p>
        </div>
      </div>
    </div>
  );
}
