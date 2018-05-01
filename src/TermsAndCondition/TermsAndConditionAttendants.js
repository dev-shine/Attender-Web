import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { push } from "react-router-redux"
import "./TermsAndCondition.css"

class TermsAndCondition extends React.Component {
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
              Services including validity of RSA or RCG registration.
            </p>
            <p>
              Attendants who solicit work through Attender do so as completely
              independent workers. The Attendants are not employees or
              subcontractors of Attender. They are not in any agency,
              partnership, joint venture or other similar relationship with
              Attender.
            </p>
            <p>
              Attendants are not agents of Attender and are entirely free to
              determine which jobs they apply for and accept and how and when
              they fulfil their contractual obligations with a Business in
              compliance with these Terms.
            </p>
            <p>Attender is not an employment or a labour hire agency.</p>
            <p>
              Attender reserves the right to ban any Business from its platform
              service at its sole discretion.
            </p>
          </li>
          <li>
            Eligibility to use the Services
            <p>
              All Attendant`s user accounts must be created and held by a
              person:
            </p>
            <ul>
              <li>
                with the capacity to form legally binding contracts under
                Australian law,
              </li>
              <li>Having a valid Tax File Number and</li>
              <li>Eligible to work within Australia.</li>
            </ul>
            <p>
              Attender reserves the right to reject an Attendant’s application
              at its sole discretion. Upon creation of an Attendant User
              Account, the sole use of the account and its responsibility rests
              with the Attendant. The Attendant cannot transfer their account or
              allow anyone other than the authorised Attendant to engage in
              activities on the platform service.
            </p>
          </li>
          <li>
            Responsibility to maintain Attendant’s User Account credentials and
            password
            <p>
              The Attendant is solely responsible for the maintenance, update
              and confidentiality of all their credentials, profile information
              and passwords. Any misuse of an Attendant account is the sole
              responsibility of the Attendant and Attender accepts no liability
              arising from account misuse. If an Attendant suspects their
              account details has been compromised they must contact Attender
              immediately and/or reset their password using the Attender account
              resetting tool.
            </p>
          </li>
          <li>
            Attendant responsibilities and Obligations
            <p>Attendants agree and undertake:</p>
            <ul>
              <li>
                to ensure that all information provided on this site by the
                Attendant is truthful, accurate and up to date and not false,
                misleading or deceptive.
              </li>
              <li>
                to abide by all laws, statutes and regulations governing their
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
                to ensure that their actions on the platform will not result in
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
              or arising from the use the Services. All legal obligations and
              relevant laws, regulations and requirements must be met at all
              times by Attendants using the Services.
            </p>
            <p>
              You agree and undertake to indemnify Attender and its officers and
              directors against any:
            </p>
            <ul>
              <li>
                legal violation or action that may arise either directly or
                indirectly through your use of the Services;
              </li>
              <li>
                claim or liability with respect to taxation as a result of your
                use of the Services; and
              </li>
              <li>
                damages, expenses or losses arising from a beach by you of the
                Terms.
              </li>
            </ul>
          </li>
          <li>
            Offer and Acceptance Constitute a Contract
            <p>
              Once terms of engagement are agreed between an Attendant and a
              Business this forms a binding and legal agreement for services
              between the Attendant and the Business. This contract for service
              does not bind Attender for the fulfilment of those services in
              anyway. Attender is not party to the contract of service between
              the Attendant and the Business.
            </p>
          </li>
          <li>
            Payments for Attendant Services
            <p>
              Upon completion of the contract, payment will be held for to 2
              working days before being released to the Attendant. Delays due to
              weekends, public holidays or banking holidays may occur from time
              to time.
            </p>
          </li>
          <li>
            Cancellation of Contract prior to Commencement
            <p>
              If a Business cancels an agreed contract within 24 hours of the
              agreed commencement time of the fulfillment of the contract, a
              cancellation fee of $50 will be deducted from the Business`s
              escrow payment before the balance of the payment is returned to
              the Business
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
              refund.
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
            Attendant Service Fees Payable to Attender
            <p>
              No fees are charged by Attender to the Attendant for use of the
              Services.
            </p>
          </li>
          <li>
            Superannuation
            <p>
              In some circumstances, Attendants may be eligible for
              superannuation payments from Businesses. Attender has no
              responsibility or liability in regard to any such entitlement or
              payments.
            </p>
          </li>
          <li>
            Insurance for Attendants
            <p>
              Attendants accept and acknowledge that they are not covered by any
              insurance held by Attender including workers compensation, general
              liability, public liability or professional indemnity insurance.
              Should Attendants choose to take out their own insurance policies,
              they are free to do so.
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
              All services provided by Attender in relation to its Services are
              provided ‘as is’ and without any warranty or guarantee of quality
              or level of service. Attender makes no representation of warranty
              of any kind.
            </p>
          </li>
          <li>
            Governing Law and Jurisdiction
            <p>
              Australian law governs the Terms. The Attendants and Attender
              agree to submit to the jurisdiction of the Courts of New South
              Wales.
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
export default connect(mapStateToProps, mapDispatchToProps)(TermsAndCondition)
