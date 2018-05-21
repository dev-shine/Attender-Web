import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { push } from "react-router-redux"
import "./../TermsAndCondition/TermsAndCondition.css"

class PrivacyPolicy extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="component TermsAndCondition">
        <h1>Attender Privacy Policy</h1>
        <p>
          Attender provides a means for businesses and individuals seeking to
          employ the services of hospitality staff as employees, contractors or
          in any other manner to be matched with individuals looking for
          hospitality work and for hospitality businesses it additionally
          affords facilities to assist in on-going resourcing, scheduling and
          management of all staff in a venue or enterprise.
        </p>
        <ol>
          <li>
            We respect your privacy
            <ol>
              <li>
                Attender Pty Ltd (`Attender`, `we`, `our` or `us`) respects your
                right to privacy and is committed to safeguarding the privacy of
                our customers, mobile software application ('App') users and
                website visitors (`you` and `your`). We adhere to the Australian
                Privacy Principles contained in the Privacy Act 1988 (Cth). This
                policy sets out how we collect and treat your personal
                information.
              </li>
              <li>
                "Personal information" is information we hold which is
                identifiable as being about you.
              </li>
            </ol>
          </li>
          <li>
            Collection of personal information
            <ol>
              <li>
                Attender will, from time to time, receive and store personal
                information you enter onto our App and/or visit our website or
                given to us in other forms. We may receive personal information
                from third parties. If we do, we will protect it as set out in
                this Privacy Policy.
              </li>
              <li>
                The personal information we collect and store may include your
                name, birth date, phone number, address, email address, profile
                information, company data, driver`s license details, RSA and RCG
                registration details, preferences for using our App and website,
                web log, computer, device and connection information and
                (depending on the service) banking and credit card details.
              </li>
              <li>
                Additionally, we may also collect any other information you
                provide while interacting with us.
              </li>
            </ol>
          </li>
          <li>
            Use of your personal information
            <ol>
              <li>
                Attender may use personal information collected from you to
                provide you with information, updates and our services. We may
                also make you aware of new and additional products, services and
                opportunities available to you. We may use your personal
                information to improve our products and services and better
                understand your needs.
              </li>
              <li>
                Attender may make third party social media features available to
                its users. We cannot ensure the security of any information you
                choose to make public in a social media feature. Also, we cannot
                ensure that parties who have access to such publicly available
                information will respect your privacy.
              </li>
              <li>
                Attender may contact you by a variety of measures including, but
                not limited to telephone, email, sms or mail.
              </li>
              <li>
                Attender utilizes the services of Promise Pay Pty Ltdv for all
                of it`s payment services. A copy of their privacy statement is
                available at: https://promisepay.com/policies/
              </li>
            </ol>
          </li>
          <li>
            Disclosure of your personal information
            <ol>
              <li>
                We may disclose your personal information to any of our
                employees, officers, insurers, professional advisers, agents,
                suppliers or subcontractors insofar as reasonably necessary for
                the purposes set out in this Policy. Personal information is
                only supplied to a third party when it is required for the
                delivery of our services except:
                <ol>
                  <li>
                    we may from time to time need to disclose personal
                    information to comply with a legal requirement, such as a
                    law, regulation, court order, subpoena, warrant, in the
                    course of a legal proceeding or in response to a law
                    enforcement agency request.
                  </li>
                  <li>
                    we may also use your personal information to protect the
                    copyright, trademarks, legal rights, property or safety of
                    Attender, its App, website and customers or third parties.
                  </li>
                  <li>
                    if there is a change of control in our business or a sale or
                    transfer of business assets, we reserve the right to
                    transfer to the extent permissible at law our user
                    databases, together with any personal information and
                    non-personal information contained in those databases. This
                    information may be disclosed to a potential purchaser under
                    an agreement to maintain confidentiality. We would seek to
                    only disclose information in good faith and where required
                    by any of the above circumstances.
                  </li>
                </ol>
              </li>
              <li>
                Information that we collect may from time to time be stored,
                processed in or transferred between parties located in countries
                outside of Australia.{" "}
              </li>
              <li>
                By providing us with personal information, you consent to the
                terms of this Privacy Policy and the types of disclosure covered
                by this Policy. Where we disclose your personal information to
                third parties, we will request that the third party follow this
                Policy regarding handling your personal information.
              </li>
            </ol>
          </li>
          <li>
            Security of your personal information
            <ol>
              <li>
                Attender is committed to ensuring that the information you
                provide to us is secure. In order to prevent unauthorised access
                or disclosure, we have put in place suitable physical,
                electronic and managerial procedures to safeguard and secure
                information and protect it from misuse, interference, loss and
                unauthorised access, modification and disclosure.
              </li>
              <li>
                The transmission and exchange of information is carried out at
                your own risk. We cannot guarantee the security of any
                information that you transmit to us, or receive from us.
                Although we take measures to safeguard against unauthorised
                disclosures of information, we cannot assure you that personal
                information that we collect will not be disclosed in a manner
                that is inconsistent with this Privacy Policy.
              </li>
            </ol>
          </li>
          <li>
            Access to your personal information
            <ol>
              <li>
                You may request details of personal information that we hold
                about you in accordance with the provisions of the Privacy Act
                1988 (Cth). A small administrative fee may be payable for the
                provision of information. If you would like a copy of the
                information which we hold about you or believe that any
                information we hold on you is inaccurate, out of date,
                incomplete, irrelevant or misleading, please email us at
                hello@attender.com.au.
              </li>
              <li>
                We reserve the right to refuse to provide you with information
                that we hold about you, in certain circumstances set out in the
                Privacy Act 1988 (Cth).
              </li>
            </ol>
          </li>
          <li>
            Software App and Website
            <ol>
              <li>
                When you use our App and/or website
                <p>
                  When you use our App and/or website, we may collect certain
                  information about your access device such as unique ID, IP
                  address, operating system, type of internet browsers you use,
                  and information about the way you use the App/website. This
                  information is used in an aggregated manner to analyse how
                  people use our App, such that we can improve our service.
                </p>
              </li>
              <li>
                Cookies
                <p>
                  We may from time to time use cookies on our App/website.
                  Cookies are very small files which a website uses to identify
                  you when you come back to the App/website and to store details
                  about your use of the App/website. Cookies are not malicious
                  programs that access or damage your computer, tablet or
                  smartphone. Most devices automatically accept cookies but you
                  can choose to reject cookies by changing your devise settings.
                  However, this may prevent you from taking full advantage of
                  our App/website.
                </p>
                <p>
                  Our website may from time to time use cookies to analyse
                  website traffic and help us provide an improved website
                  visitor experience. Additionally, cookies may be used to serve
                  relevant ads to website visitors through third party services
                  such as Google Adwords. These ads may appear on this website
                  or other websites you visit.
                </p>
              </li>
              <li>
                Third parties
                <p>
                  Our App/website may, from time to time, have links to other
                  Apps or websites not owned or controlled by us. These links
                  are meant for your convenience only. Links to third party Apps
                  and websites do not constitute sponsorship or endorsement or
                  approval of these third parties. Please be aware that Attender
                  is not responsible for the privacy practices of other such
                  Apps or websites. We encourage our users to be aware, when
                  they leave our App or website, to read the privacy statements
                  of each and every App or website that collects personal
                  identifiable information.
                </p>
              </li>
              <li>
                Geo-location
                <p>
                  When you visit the App, we may use GPS technology (or other
                  similar technology) to determine your current location in
                  order to determine the city you are located within to improve
                  the user experience and display a location map with relevant
                  opportunities and data. We will not share your current
                  location with other users or partners.
                </p>
              </li>
            </ol>
          </li>
          <li>
            Complaints about privacy
            <ol>
              <li>
                If you have any complaints about our privacy practices, please
                feel free to send in details of your complaints to 4/68-70 White
                Street, Lilyfield, NSW 2040, Australia. We take complaints very
                seriously and will respond shortly after receiving written
                notice of your complaint.
              </li>
            </ol>
          </li>
          <li>
            Op out right
            <ol>
              <li>
                You can stop all collection of information by the App easily by
                uninstalling the App. You may use the standard uninstall
                processes as may be available as part of your mobile device or
                via the mobile App marketplace or network. You can also request
                to opt-out via email, at hello@attender.com.au.
              </li>
            </ol>
          </li>
          <li>
            Changes to Privacy Policy
            <ol>
              <li>
                Please be aware that we may change this Privacy Policy in the
                future. We may modify this Privacy Policy at any time, in our
                sole discretion and all modifications will be effective
                immediately upon our posting of the modifications on our website
                or notice board. Please check back from time to time to review
                our Privacy Policy.
              </li>
            </ol>
          </li>
        </ol>
        <hr />
        <p>09 September 2017</p>
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
export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy)
