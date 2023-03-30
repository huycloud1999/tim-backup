import React from "react";

import Image from "next/image";

import touch_icon from "../public/imgs/touch_icon.svg";
import { getAllGetInTouch } from "../store/action/pageGet-in-touch";
import { useState } from "react";
import Modal from "react-modal";
import Link from "next/link";

export default function GetInTouch(props) {
  // console.log(props.options)
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    subject: ''
  })

  const { getInTouch: getInTouch } = props.options;
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
  const sendContactForm = async (data) =>
    fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json", Accept: "application/json" },
    }).then((res) => {
      console.log("🚀 ~ file: get-in-touch.js:38 ~ GetInTouch ~ res:", res)
      // if (!res.ok) throw new Error("Failed to send message");
      return res.json();
    });

  const handleSubmit = async (e) => {
    e.preventDefault()
    // validate

    try {
      setLoading(true)
      const rs = await sendContactForm(data)
      setLoading(false)
      clearInput();
      // alert('Your email has send successfully!')
      openModal();
    } catch (error) {
      console.error("🚀 ~ file: get-in-touch.js:50 ~ handleSubmit ~ error:", error)

    }
  };
  const onChange = (e) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value
    })
  }

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
    setData({
      name: '',
      email: '',
      company: '',
      message: '',
      subject: ''
    })
  }
  const submitContact = async (event) => {
    event.preventDefault();
    // alert(`So your name is ${event.target.name.value}?`);
    clearInput();
    openModal();
  };
  return (
    <>
      <div className="main-get-in-touch">
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          className={"after_submit_popup"}
        >
          <h1 className="popup_after_submit_text">
            Thank you for your interest. Your information has been recorded and
            we will get back to you soon.
          </h1>
        </Modal>

        <div className="container">
          <div className="big-title">{getInTouch.title}</div>
          <div className="divider"></div>
          <div className="contact-area">
            <div className="column1">
              <div className="form-contact">
                <form
                  className="contact-form"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={data.name}
                    placeholder="Name"
                    required
                    onChange={onChange}
                  />
                  <input
                    type="text"
                    name="company"
                    id="company"
                    value={data.company}
                    placeholder="Company"
                    onChange={onChange}
                  />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={data.email}
                    placeholder="Email"
                    required
                    onChange={onChange}
                  />
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={data.subject}
                    placeholder="Subject"
                    required
                    onChange={onChange}
                  />
                  <textarea
                    name="message"
                    id="message"
                    cols="30"
                    rows="10"
                    placeholder="Message"
                    value={data.message}
                    required
                    onChange={onChange}
                  ></textarea>
                  <button type="submit" className="btn-mobile" disabled={loading}>
                    Send now
                    <div className="btn-btn-mobile">
                      {" "}
                      <Image src={touch_icon} alt="image" />
                    </div>
                  </button>
                </form>
              </div>
              {/* <div className="image-container column2 column2_mobile hideOnDesktop">
                <Image src={getInTouch.img.sourceUrl} layout='fill' className="image-item" alt="Image" />
              </div> */}
              <div className="contact-info">
                <div className="title-info">{getInTouch.contactInfo.title}</div>
                <div className="info-container info-container-touch">
                  <div className="sub-column1 sub-column">
                    <div className="heading">
                      {getInTouch.contactInfo.managementAg.title}
                    </div>
                    <div className="sub-heading">
                      {getInTouch.contactInfo.managementAg.nation}
                    </div>
                    {/* <div className="divider"></div> */}
                    <div className="info-area">
                      <div className="icon-wrapper">
                        <div className="icon image-container img_icon ">
                          <Image
                            src={
                              getInTouch.contactInfo.managementAg.location.img
                                .sourceUrl
                            }
                            layout="fill"
                            className="image-item"
                            alt="location"
                          />
                        </div>
                        <div
                          className="content-in-touch img_icon_w"
                          dangerouslySetInnerHTML={{
                            __html:
                              getInTouch.contactInfo.managementAg.location
                                .locationContent,
                          }}
                        ></div>
                      </div>

                      <div className="icon-wrapper">
                        <div className="icon image-container img_icon">
                          <Image
                            src={
                              getInTouch.contactInfo.managementAg.email.img
                                .sourceUrl
                            }
                            layout="fill"
                            className="image-item"
                            alt="Email"
                          />
                        </div>
                        <div className="content-in-touch">
                          {
                            getInTouch.contactInfo.managementAg.email
                              .emailContent
                          }
                        </div>
                      </div>
                      <div className="icon-wrapper">
                        <div className="icon image-container img_icon">
                          <Image
                            src={
                              getInTouch.contactInfo.managementAg.sdt.img
                                .sourceUrl
                            }
                            layout="fill"
                            className="image-item"
                            alt="phone_icon"
                          />
                        </div>
                        <div className="content-in-touch">
                          {getInTouch.contactInfo.managementAg.sdt.sdt}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="separator"></div>
                  <div className="sub-column2 sub-column">
                    <div className="heading">
                      {getInTouch.contactInfo.timVnJsc.title}
                    </div>
                    <div className="sub-heading">
                      {getInTouch.contactInfo.timVnJsc.nation}
                    </div>
                    {/* <div className="divider"></div>
                     */}
                    <div className="info-area">
                      {/* <div className="icon-wrapper">
                        <div className="icon image-container img_icon" >
                          <Image src={getInTouch.contactInfo.timVnJsc.sdt.img.sourceUrl} layout='fill' className="image-item" alt='location' />
                        </div>
                        <div className="content-in-touch">{getInTouch.contactInfo.timVnJsc.sdt.sdtContent}</div>
                      </div>
                      <div className="icon-wrapper">
                        <div className="icon image-container img_icon" >
                          <Image src={getInTouch.contactInfo.timVnJsc.email.img.sourceUrl} layout='fill' className="image-item" alt='location' />
                        </div>
                        <div className="content-in-touch">{getInTouch.contactInfo.timVnJsc.email.emailContent}</div>
                      </div> */}
                      <div className="icon-wrapper">
                        <div className="icon image-container img_icon">
                          <Image
                            src={
                              getInTouch.contactInfo.timVnJsc.locationContent
                                .img.sourceUrl
                            }
                            layout="fill"
                            className="image-item"
                            alt="location"
                          />
                        </div>

                        <div
                          className="content-in-touch content-in-touch-mobile"
                          dangerouslySetInnerHTML={{
                            __html:
                              getInTouch.contactInfo.timVnJsc.locationContent
                                .locationContent,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className=" image-container column2 hideOnMobile hideOnTablet">
              <Image src={getInTouch?.img?.sourceUrl} layout='fill' className="image-item" alt="Image" />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const [resNew, res] = await Promise.all([getAllGetInTouch()]);

  return {
    props: {
      options: resNew?.data?.data?.page,
    },
  };
}
