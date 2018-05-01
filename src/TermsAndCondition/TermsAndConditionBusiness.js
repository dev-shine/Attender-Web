import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { push } from "react-router-redux"
import "./TermsAndCondition.css"

class TermsAndConditionBusiness extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="component TermsAndCondition">
        <h1>Attender Terms and Conditions of Use – Attendants</h1>
        <p>
          Attender Pty Ltd (`Attender, we, us or our`) provides a means for
          individuals seeking work in hospitality (`Attendants or you`) to be
          matched with businesses or hosts looking to employ the services of
          hospitality staff (`Businesses`) and for hospitality businesses it
          additionally affords (on a subscription basis) facilities to assist in
          on-going resourcing, scheduling and management of all staff in a venue
          or enterprise (`the Services`).
        </p>
        <ol>
          <li>
            Contract with Attender
            <p>
              By using Attender, you agree to be bound by all these terms and
              conditions and the Attender Website Terms and Conditions of Use,
              each as varied, modified or updated by Attender from time to time
              (collectively, `the Terms`) and which form a contract between you
              and Attender. If you do not agree to these Terms, you may not
              access or use the Services. These Terms expressly replace any
              prior understanding, agreement or arrangement with you.
            </p>
          </li>
          <li>
            App and Web based Platform
            <p>
              Attender is a mobile App and web based platform that connects
              Businesses directly with hospitality workers. Attender is a
              digital venue only and does not guarantee or accept any liability
              or responsibility for the quality or legality of Attendants
              procured by Businesses through the Attender service. Attender does
              not screen any Attendants on its platform or provide any checking
              or verification of information on Attendants provided by the
              Services including validity of RSA or RCG registration. Attendants
              who solicit work through Attender do so as completely independent
              workers. The Attendants are not employees or subcontractors of
              Attender. They are not in any agency, partnership, joint venture
              or other similar relationship with Attender. Attendants are not
              agents of Attender and are entirely free to determine which jobs
              they apply for and accept and how and when they fulfil their
              contractual obligations with a Business in compliance with these
              Terms. Attender is not an employment or a labour hire agency.
              Attender reserves the right to ban any Business from its platform
              service at its sole discretion.
            </p>
          </li>
          <li>
            Eligibility to use the Services
            <p>
              Upon creation of a Business user account, the sole use of the
              account and its responsibility rests with the Business. The
              Business cannot transfer their account or allow anyone other than
              the authorised Business to engage in activities on the platform
              service.
            </p>
          </li>
          <li>
            Responsibility to take out and maintain Insurance
            <p>
              It is your responsibility to have the appropriate insurances (such
              as workers compensation and public liability) in place to cover
              the Attendants you seek to secure the efforts of through use of
              the Attender Services. Attender accepts no responsibility for
              insurance cover for Attendants or Businesses.
            </p>
          </li>
          <li>
            Responsibility to maintain Business User Account credentials and
            password
            <p>
              A Business is solely responsible for the maintenance and
              confidentiality of all its credentials and passwords. Any misuse
              of a Business account is the sole responsibility of the Business
              and Attender accepts no liability arising from account misuse. If
              a Business suspects their account details have been compromised it
              must contact Attender immediately and/or reset their password
              using the Attender account resetting tool.
            </p>
          </li>
          <li>
            Responsibilities and Obligations of Businesses
            <p>Businesses agree and undertake:</p>
            <ul>
              <li>
                to ensure that all information provided on this site by the
                Business is truthful, accurate and up to date and not false,
                misleading or deceptive.
              </li>
              <li>
                to abide by all laws, statutes and regulations governing its
                activities in relation to the use of this platform.
              </li>
              <li>
                to not engage in any threatening, harassing or libellous
                behaviour while using the platform.
              </li>
              <li>to not compromise the Attender platform in any way.</li>
              <li>
                to ensure that any and all information and communication
                provided by them on the platform is not threatening, harassing
                obscene, immoral, defamatory, misleading, deceptive, false or
                infringes on any confidentiality or intellectual property
                rights.
              </li>
              <li>
                to ensure that its actions on the platform will not result in
                malicious code, viruses or information that affects the platform
                performance or corrupts its intended function.
              </li>
              <li>
                to ensure that any and all images that are upload to or linked
                from the platform are not obscene, inappropriate, illegal or
                irrelevant to the stated purpose of the platform.
              </li>
            </ul>
          </li>
          <li>
            Limitations of Attender Liability
            <p>
              Attender will not be liable for any claim, injury, loss or damage
              as result of any activities conducted directly or indirectly via
              its Services. All legal obligations and relevant laws, regulations
              and requirements must be met at all times by Businesses using the
              platform. Businesses agree and undertake to indemnify Attender and
              its officers and directors against any: legal violation or action
              that may arise either directly or indirectly through your use of
              the Services; claims or liability with respect to taxation as a
              result of your use of the Services; and damages, expenses or
              losses arising from a breach by you of the Terms.
            </p>
          </li>
          <li>
            Types of Services
            <p>
              Attender is available for use by Businesses on either a Pay per
              Attendant Contract basis or on a Subscription basis. No fees are
              charged by us to the Attendant for use of the Attender Services.
            </p>{" "}
          </li>
          <li>
            Pay per Attendant Contract based service
            <p>
              {" "}
              A one-off service fee is payable by the Business to Attender for
              each Attendant contract arranged using Attender. This service fee
              is equal to 16.5% of the total contracted Attendant costs and is
              inclusive of GST (`Service Fee`).
            </p>{" "}
          </li>
          <li>
            Subscription Based Services
            <p>
              Attender offers two levels of subscription services. Both services
              are available for a monthly fee payable in advance and cancellable
              upon one month`s notice.
            </p>
            <ol>
              <li>
                Unlimited Attender Staff Finding
                <p>
                  This subscription service affords to a Business unlimited use
                  of the human resource matching and engagement capabilities of
                  Attender at a fixed monthly cost of $49 (excluding GST). No
                  additional payments are due to Attender irrespective of the
                  number of Attendants or sessions contracted for using the
                  Services during the subscription period.
                </p>
              </li>
              <li>
                Unlimited Attender Staff Finding plus Management
                <p>
                  This premium level service provides unlimited use of
                  Attender`s resource matching and engagement capabilities
                  together with a suite of facilities to assist and simplify
                  hospitality venue resource management. These facilities
                  include integrated event calendar, staff scheduling and
                  messaging services. This total service is available at a cost
                  of $3 per month (excluding GST) for each hospitality worker
                  providing services to such enterprise or covered by such
                  Attender services during the relevant subscription month.
                </p>
              </li>
              <li>
                Payment for Subscription Services
                <ol>
                  <li>
                    Where the option is given to you, you may make payment of
                    the Subscription Fee by way of:
                    <ul>
                      <li>
                        Electronic funds transfer into our nominated bank
                        account Credit Card Payment
                      </li>
                    </ul>
                    <p>
                      All payments made in the course of your use of the
                      Services are made using Promise Pay Pty Ltd (trading as
                      Assembly Payments). In making any payment in relation to
                      your use of the Services, you warrant that you have read,
                      understood and agree to be bound by the Assembly Payments
                      terms and conditions which are available on their website
                    </p>
                  </li>
                  <li>
                    You acknowledge and agree that where a request for the
                    payment of the Subscription Fee is returned or denied, for
                    whatever reason, by your financial institution or is unpaid
                    by you for any other reason, then you are liable for any
                    costs, including banking fees and charges, associated with
                    the Subscription Fee.
                  </li>
                  <li>
                    You agree and acknowledge that Attender can vary the
                    Subscription Fee at any time and that the varied
                    Subscription Fee will come into effect following the
                    conclusion of the existing Subscription Period.
                  </li>
                </ol>
              </li>
            </ol>
          </li>

          <li>
            Payment for Contracted services of Attendant
            <p>
              Once the terms of a contract for services has been agreed by a
              Business and an Attendant, payment in full for the value of the
              contract plus Attender`s Service Fee must be made by the Business
              by credit card in advance to the Attender escrow service account.
              This account is managed on behalf of Attender by Promise Pay Pty
              Ltd (trading as Assembly Payments). In making any payment in
              relation to your use of the Services, you warrant that you have
              read, understood and agree to be bound by the Assembly Payments
              terms and conditions which are available on their website
            </p>
            <p>
              Upon completion of the contract, payment will be held for 2
              working days before being released to the relevant Attendant.
              Should a Business wish to dispute a payment before being released
              to an Attendant it must do so within 24 hours of the event or
              matter giving rise to such wish using the Payment Dispute
              mechanism on the platform.
            </p>
            <p>
              Attender will provide a tax invoice to the Business for our fees
              payable to Attender. Attender reserves the right to adjust or
              change the fees or fee structure at any time and will notify
              Businesses of any changes.
            </p>
          </li>
          <li>
            Cancellation of Contract prior to Commencement
            <p>
              If a Business cancels an agreed contract within 24 hours of the
              agreed commencement time of the fulfillment of the contract, a
              cancellation fee of $50 will be deducted from the Business`s
              escrow payment before the balance of the payment is returned to
              the Business.
            </p>
            <ul>
              <li>
                $40 of this fee will be made payable to the Attendant (without
                any further deductions).
              </li>
              <li>$10 of this fee will be levied and held by Attender.</li>
            </ul>
          </li>
          <li>
            Cancellation of a Contract after Commencement
            <p>
              If a Business no longer requires an Attendant after commencement
              of the contract or part way through fulfilment of a contract, then
              payment for the contract will be made in full. However, should the
              Attendant fail to fulfil their obligations under the contract
              (e.g. fail to turn up or on their own volition depart prior to
              completion of the contract), the Business may lodge a Payment
              Dispute flag and upon determination may receive a full or partial
              refund. Payment Disputes must be registered with Attender within
              24 hours of the event or matter giving rise to such.
            </p>
          </li>
          <li>
            Minimum Contract Value
            <p>
              The minimum value of any contract using the Attender platform
              service is $75.
            </p>
          </li>

          <li>
            Severability
            <p>
              Should any provision of these Terms be held unenforceable or
              invalid for any reason then such Terms will be deemed modified to
              the extent that the remaining Terms become valid and enforceable.
            </p>
          </li>
          <li>
            No Warranty
            <p>
              All Services provided by Attender are provided ‘as is’ and without
              any warranty or guarantee of quality or level of service. Attender
              makes no representation of warranty of any kind.
            </p>
          </li>
          <li>
            Governing Law and Jurisdiction
            <p>
              Australian law governs the Terms. The parties agree to submit to
              the jurisdiction of the Courts of New South Wales.
            </p>
          </li>
          <li>
            Privacy
            <p>
              By agreeing to these terms and conditions you also agree with
              Attender’s privacy policy located here{" "}
              <a href="privacy-statement">
                http://www.Attender.com/privacy-statement/
              </a>.
            </p>
          </li>
        </ol>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      goToStaff: staffId => push(`/find-staff`)
    },
    dispatch
  )
export default connect(mapStateToProps, mapDispatchToProps)(
  TermsAndConditionBusiness
)
