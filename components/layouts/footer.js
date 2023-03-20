import Image from "next/image";
import Link from "next/link";
import React from "react";
import imgLogo from "../../public/imgs/logo_footer4.svg";
import imgicon1 from "../../public/imgs/call-calling.png";
import imgicon2 from "../../public/imgs/sms.png";
import imgicon3 from "../../public/imgs/location.png";
import TIM from "../../public/imgs/TIM_footer.png";
import Arrow from "../../public/imgs/Arrow.svg";
import Modal from "react-modal";
import { useState } from "react";

export default function Footer({ data }) {
  // console.log(data);
  const [modalIsOpen, setIsOpen] = useState(false);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }
  function clearInput() {
    document.querySelectorAll(".icon_input input").forEach((element, index) => {
      element.value = "";
    });
  }
  const submitEmail = (event) => {
    event.preventDefault();
    openModal();
  };
  return (
    <div className="footer ">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        className={"after_submit_popup"}
      >
        <h1 className="popup_after_submit_text">
          Thank you for your interest. Your information has been recorded. We
          will get back to you with our latest updates.
        </h1>
      </Modal>
      <div className="container">
        <div className="footer_1 ">
          <div className="colum_1">
            <div className="image-container img__footer">
              <Link href="/">
                <Image
                  src={data?.colums1?.img?.sourceUrl}
                  alt="imgs"
                  className="image_logo image-item"
                  layout="fill"
                />
              </Link>
            </div>
            <p>{data?.colums1?.title}</p>
            <div className="icon_input">
              <form action="" className="icon_input" onSubmit={submitEmail}>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email for regular investment updates"
                  required
                />
                <button type="submit" className="icon_footer">
                  <Image src={Arrow} alt="imgs" className="input_arrow" />
                </button>
              </form>
            </div>
          </div>
          <div className="colum_2 colum_2_mobile colum_width_menu">
            <div className="colum__2__title">
              <Link href="/get-in-touch">
                <a className="colum_2_title">{data.columsContact.title}</a>
              </Link>
              <p>{data.columsContact.turicumInvestmentManagementAg} </p>
            </div>

            <div className="co_2_title">
              <div className="colum_2_icon">
                <div className="colum_2__icon image-container">
                  <Link
                    href="https://www.google.com/maps/place/Blegistrasse+5,+6340+Baar,+Th%E1%BB%A5y+S%C4%A9/@47.2162384,8.5645895,14.92z/data=!4m5!3m4!1s0x479aa95ccf9b4bdd:0x9ddd1530b535c88b!8m2!3d47.2160405!4d8.5718913?hl=vi-VN"
                    target="_blank"
                  >
                    <Image
                      src={data.columsContact.location.img.sourceUrl}
                      alt="icon"
                      layout="fill"
                      className=" image-item"
                    />
                  </Link>
                </div>
                <ul className="colum_2_link colum_2_link__PC">
                  <Link
                    href="https://www.google.com/maps/place/Blegistrasse+5,+6340+Baar,+Th%E1%BB%A5y+S%C4%A9/@47.2160405,8.5697026,17z/data=!3m1!4b1!4m5!3m4!1s0x479aa95ccf9b4bdd:0x9ddd1530b535c88b!8m2!3d47.2160405!4d8.5718913?hl=vi-VN"
                    target="_blank"
                  >
                    <a>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: data.columsContact.location.location,
                        }}
                      ></span>
                    </a>
                  </Link>
                </ul>
              </div>

              <div className="colum_2_icon">
                <div className="colum_2__icon image-container">
                  <Link href="mailto:info@timvest.ch">
                    <Image
                      src={data.columsContact.email.img.sourceUrl}
                      alt="icon"
                      layout="fill"
                      className=" image-item"
                    />
                  </Link>
                </div>
                <ul className="colum_2_link">
                  <Link href="mailto:info@timvest.ch">
                    <a>
                      <span>{data.columsContact.email.email}</span>
                    </a>
                  </Link>
                </ul>
              </div>
              <div className="colum_2_icon">
                <div className="colum_2__icon image-container">
                  <Link href="tel:+41 41 449 61 61">
                    <Image
                      src={data.columsContact.sdt.img.sourceUrl}
                      alt="icon"
                      layout="fill"
                      className=" image-item"
                    />
                  </Link>
                </div>
                <ul className="colum_2_link">
                  <Link href="tel:+41 41 449 61 61">
                    <a>
                      <span>{data.columsContact.sdt.sdt} </span>
                    </a>
                  </Link>
                </ul>
              </div>
            </div>
          </div>

          <div className="colum_2 colum_width_contact colum_new">
            <div className="colum__2__title">
              <p
                dangerouslySetInnerHTML={{
                  __html: data.timVietnamJsc.timVietnamJsc,
                }}
              ></p>

              {/* <div  dangerouslySetInnerHTML={{__html: ab.description.content}}>đs</div> */}
            </div>
            <div className="co_2_title co_2_title_new">
              <div className="colum_2_icon">
                <div className="colum_2__icon image-container">
                  <Link
                    href="https://www.google.com/maps/place/Lim+Tower+2/@10.7746647,106.6860731,17z/data=!3m1!4b1!4m5!3m4!1s0x31752f24b4d0c969:0xa41578db6e3db2c1!8m2!3d10.7745812!4d106.6881928?hl=vi-VN"
                    target="_blank"
                  >
                    <Image
                      src={data.timVietnamJsc.location.img.sourceUrl}
                      alt="icon"
                      layout="fill"
                      className=" image-item"
                    />
                  </Link>
                </div>
                <ul className="colum_2_link">
                  <Link
                    href="https://www.google.com/maps/place/Lim+Tower+2/@10.7746647,106.6860731,17z/data=!3m1!4b1!4m5!3m4!1s0x31752f24b4d0c969:0xa41578db6e3db2c1!8m2!3d10.7745812!4d106.6881928?hl=vi-VN"
                    target="_blank"
                  >
                    <a>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: data.timVietnamJsc.location.location,
                        }}
                      ></span>
                    </a>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer_2">
          <div>
            <div className="footer_2_colum1">
              <p>{data.turicumInvestment.turicumInvestment}</p>
              <div className="sup_footer_2">
                <Link href="https://www.linkedin.com/company/turicum-investment-management-ag/?viewAsMember=true">
                  <a target={"_blank"}>{data?.turicumInvestment?.linkedin}</a>
                </Link>
                <Link
                  href={data?.turicumInvestment?.finsapolicyfile?.link || ""}
                >
                  <a target={"_blank"}>
                    {data?.turicumInvestment?.finsaPolicy}
                  </a>
                </Link>
                <Link
                  href={data?.turicumInvestment?.privacyPolicyFile?.link || ""}
                >
                  <a target={"_blank"}>
                    {data?.turicumInvestment?.privacyPolicy}
                  </a>
                </Link>
                <Link href={data?.turicumInvestment?.termOfUseFile?.link || ""}>
                  <a target={"_blank"}>{data?.turicumInvestment?.termOfUse}</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
