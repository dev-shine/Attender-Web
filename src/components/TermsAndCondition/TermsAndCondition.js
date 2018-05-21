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
        <h1>Attender Website Terms and Conditions of Use</h1>
        <ol>
          <li>
            About the Website
            <ol>
              <li>
                Welcome to the Attender website (`the Website`). The Website
                provides a means for businesses and individuals seeking to
                employ the services of hospitality staff to be matched with
                individuals looking for hospitality work and for hospitality
                businesses it additionally affords (on a subscription basis)
                facilities to assist in on-going resourcing, scheduling and
                management of all staff in a venue or enterprise (`the
                Services`).
              </li>
              <li>
                The Website is operated by Attender Pty Ltd ACN 619 176 859
                (`Attender`). Access to and use of the Website, or any of its
                associated products or Services, is provided by Attender. Please
                read these terms and conditions (`the Terms') carefully. By
                using, browsing and/or reading the Website, this signifies that
                you have read, understood and agree to be bound by the Terms. If
                you do not agree with the Terms, you must cease usage of the
                Website, or any of the Services, immediately.
              </li>
              <li>
                Attender reserves the right to review and change any of the
                Terms at its sole discretion by updating this page. When
                Attender updates the Terms, it will use reasonable endeavours to
                provide you with notice of updates to the Terms. Any changes to
                the Terms take immediate effect from the date of their
                publication. Before you continue, we recommend you keep a copy
                of the Terms for your records.
              </li>
            </ol>
          </li>
          <li>
            Your obligations in using the Website
            <ol>
              <li>
                In using the Website, you agree to comply with the following:
                <ol>
                  <li>
                    you will use the Services only for purposes that are
                    permitted by:
                    <ol>
                      <li>the Terms; and</li>
                      <li>
                        any applicable law, regulation or generally accepted
                        practices or guidelines in the relevant jurisdictions;
                      </li>
                    </ol>
                  </li>
                  <li>
                    you have the sole responsibility for protecting the
                    confidentiality of your password and/or email address. Use
                    of your password by any other person may result in the
                    immediate cancellation of the Services;
                  </li>
                  <li>
                    access and use of the Website is limited, non-transferable
                    and allows for the sole use of the Website by you for the
                    purposes of Attender providing the Services;
                  </li>
                  <li>
                    you will not use the Services or the Website in connection
                    with any commercial endeavours except those that are
                    specifically endorsed or approved by the management of
                    Attender;
                  </li>
                  <li>
                    you will not use the Services or Website for any illegal
                    and/or unauthorised use which includes collecting email
                    addresses of Members by electronic or other means for the
                    purpose of sending unsolicited email or unauthorised framing
                    of or linking to the Website;{" "}
                  </li>
                  <li>
                    you agree that commercial advertisements, affiliate links,
                    and other forms of solicitation may be removed from the
                    Website without notice and may result in termination of the
                    Services. Appropriate legal action will be taken by Attender
                    for any illegal or unauthorised use of the Website; and
                  </li>
                  <li>
                    you acknowledge and agree that any automated use of the
                    Website or its Services is prohibited.
                  </li>
                </ol>
              </li>
            </ol>
          </li>
          <li>
            Copyright and Intellectual Property
            <ol>
              <li>
                The Website, the Services and all of the related products of
                Attender are subject to copyright. The material on the Website
                is protected by copyright under the laws of Australia and
                through international treaties. Unless otherwise indicated, all
                rights (including copyright) in the Services and compilation of
                the Website (including but not limited to text, graphics, logos,
                button icons, video images, audio clips, Website code, scripts,
                design elements and interactive features) or the Services are
                owned or controlled for these purposes, and are reserved by
                Attender or its contributors.
              </li>
              <li>
                All trademarks, service marks and trade names are owned,
                registered and/or licensed by Attender, who grants to you a
                worldwide, non-exclusive, royalty-free, revocable license to:
                <ol>
                  <li>use the Website pursuant to the Terms;</li>
                  <li>
                    copy and store the Website and the material contained in the
                    Website in your device's cache memory; and
                  </li>
                  <li>
                    print pages from the Website for your own personal and
                    non-commercial use.
                  </li>
                </ol>
              </li>
              <li>
                Attender does not grant you any other rights whatsoever in
                relation to the Website or the Services. All other rights are
                expressly reserved by Attender.
              </li>
              <li>
                Attender retains all rights, title and interest in and to the
                Website and all related Services. Nothing you do on or in
                relation to the Website will transfer any:
                <ol>
                  <li>
                    business name, trading name, domain name, trade mark,
                    industrial design, patent, registered design or copyright,
                    or
                  </li>
                  <li>
                    right to use or exploit a business name, trading name,
                    domain name, trade mark or industrial design, or
                  </li>
                  <li>
                    thing, system or process that is the subject of a patent,
                    registered design or copyright (or an adaptation or
                    modification of such a thing, system or process) to you.{" "}
                  </li>
                </ol>
              </li>
              <li>
                You may not, without the prior written permission of Attender
                and the permission of any other relevant rights owners:
                broadcast, republish, up-load to a third party, transmit, post,
                distribute, show or play in public, adapt or change in any way
                the Services or third party Services for any purpose, unless
                otherwise provided by these Terms. This prohibition does not
                extend to materials on the Website which are freely available
                for re-use or are in the public domain.
              </li>
            </ol>
          </li>
          <li>
            Privacy
            <ol>
              <li>
                Attender takes your privacy seriously and any information
                provided through your use of the Website and/or Services are
                subject to Attender's Privacy Policy, which is available on the
                Website.
              </li>
            </ol>
          </li>
          <li>
            General Disclaimer
            <ol>
              <li>
                Attender's total liability arising out of or in connection with
                the Services or these Terms, however arising, including under
                contract, tort (including negligence), in equity, under statute
                or otherwise, will not exceed the resupply of the Services to
                you.
              </li>
              <li>
                Nothing in the Terms limits or excludes any guarantees,
                warranties, representations or conditions implied or imposed by
                law, including the Australian Consumer Law (or any liability
                under them) which by law may not be limited or excluded.{" "}
              </li>
              <li>
                Subject to this clause 5, and to the extent permitted by law:
                <ol>
                  <li>
                    all terms, guarantees, warranties, representations or
                    conditions which are not expressly stated in the Terms are
                    excluded; and
                  </li>
                  <li>
                    Attender will not be liable for any special, indirect or
                    consequential loss or damage (unless such loss or damage is
                    reasonably foreseeable resulting from our failure to meet an
                    applicable Consumer Guarantee), loss of profit or
                    opportunity, or damage to goodwill arising out of or in
                    connection with the Services or these Terms (including as a
                    result of not being able to use the Services or the late
                    supply of the Services), whether at common law, under
                    contract, tort (including negligence), in equity, pursuant
                    to statute or otherwise.
                  </li>
                </ol>
              </li>
              <li>
                Use of the Website and the Services is at your own risk.
                Everything on the Website and the Services is provided to you
                "as is" and "as available" without warranty or condition of any
                kind. None of the affiliates, directors, officers, employees,
                agents, contributors and licensors of Attender make any express
                or implied representation or warranty about the Services or any
                products or Services (including the products or Services of
                Attender) referred to on the Website. This includes (but is not
                restricted to) loss or damage you might suffer as a result of
                any of the following:
                <ol>
                  <li>
                    failure of performance, error, omission, interruption,
                    deletion, defect, failure to correct defects, delay in
                    operation or transmission, computer virus or other harmful
                    component, loss of data, communication line failure,
                    unlawful third party conduct, or theft, destruction,
                    alteration or unauthorised access to records;{" "}
                  </li>
                  <li>
                    the accuracy, suitability or currency of any information on
                    the Website, the Services, or any of its Services related
                    products (including third party material and advertisements
                    on the Website);
                  </li>
                  <li>
                    costs incurred as a result of you using the Website, the
                    Services or any of the products of Attender; and
                  </li>
                  <li>
                    the Services or operation in respect to links which are
                    provided for your convenience.
                  </li>
                </ol>
              </li>
            </ol>
          </li>
          <li>
            Governing Law
            <ol>
              <li>
                The Terms are governed by the laws of New South Wales,
                Australia. Any dispute, controversy, proceeding or claim of
                whatever nature arising out of or in any way relating to the
                Terms and the rights created hereby shall be governed,
                interpreted and construed by, under and pursuant to the laws of
                New South Wales, Australia, without reference to conflict of law
                principles, notwithstanding mandatory rules. The validity of
                this governing law clause is not contested. The Terms shall be
                binding to the benefit of the parties hereto and their
                successors and assigns.
              </li>
            </ol>
          </li>
          <li>
            Severance
            <ol>
              <li>
                If any part of these Terms is found to be void or unenforceable
                by a Court of competent jurisdiction, that part shall be severed
                and the rest of the Terms shall remain in force.{" "}
              </li>
            </ol>
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
