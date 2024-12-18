import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import emailjs from "emailjs-com";
import axios from "axios";
import { Helmet } from "react-helmet";
import { CustomCursorContext } from "../../contexts/CustomCursorContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faInstagram,
  faLinkedinIn,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowAltCircleDown } from "@fortawesome/free-regular-svg-icons";

import Footer from "../../components/Footer";
import HighlightTitle from "../../components/HighlightTitle";
import Modal from "../../components/Modal";

import ButtonStyled from "../../components/styledComponents/Button";

type FormValues = {
  name: string;
  email: string;
  budget: string;
  description: string;
};

const Contact: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { setType } = useContext(CustomCursorContext);
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data: any) => {
    const templateParams = {
      name: data.name,
      email: data.email,
      budget: data.budget,
      description: data.description,
    };

    handleGetFormToSheet(templateParams);
  };

  const handleGetFormToSheet = async (form: any) => {
    const serviceId: any = process.env.REACT_APP_SERVICE_ID;
    const templateId: any = process.env.REACT_APP_TEMPLATE_ID;
    const userId: any = process.env.REACT_APP_USER_ID;
    const googleScriptUrl: any = process.env.REACT_APP_URL_GOOGLE_SCRIPT;

    if (form) {
      try {
        setLoading(true);
        await emailjs
          .send(serviceId, templateId, form, userId)
          .then(
            (response) => {
              setLoading(false);
              setSuccess(true);
              setShowModal(true);
            },
            (error) => {
              setLoading(false);
              setSuccess(false);
              setShowModal(true);
              throw "error";
            }
          )
          .then(() => {
            reset({
              name: "",
              email: "",
              budget: "",
              description: "",
            });
          });

        await axios({
          headers: {
            "content-type": "text/plain;charset=UTF-8",
          },
          method: "post",
          url: googleScriptUrl,
          data: form,
        });
      } catch (e) {
        setLoading(false);
        setSuccess(false);
        setShowModal(true);
      }
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Call me 𝓑𝓲𝓷𝓱 - Contact to me</title>
      </Helmet>
      <div className="md:py-10 py-6 lg:px-[8%] md:px-[4%] px-[8%]">
        <div className="md:mb-16 mb-8">
          <HighlightTitle title="Don't be a stranger" />
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="lg:text-7xl md:text-6xl text-3xl font-bold mt-3"
          >
            just say hello.
          </motion.div>
        </div>
        <div className="flex lg:flex-row flex-col lg:gap-12 md:gap-8 gap-7">
          <div className="flex-1 xl:pr-10 md:pr-6 pr-0">
            <div className="text-[#888] font-semibold flex flex-col gap-8">
              <div className="text-justify leading-[1.7rem] md:text-xl text-lg">
                Feel free to get in touch with me. I'm always open to discuss
                new projects, creative ideas or opportunities to be part of your
                vision.
              </div>
              <div className="lg:block hidden">
                <div className="flex flex-col gap-6 justify-between">
                  <div className="flex flex-col gap-6 w-1/2">
                    <div className="flex flex-col">
                      <div className="font-light text-gray-500">
                        My mail contact
                      </div>
                      <a
                        href="mailto:binhnnt.98@gmail.com"
                        className="font-bold text-lg text-[#333] dark:text-[#fff] hover:text-[#b23d43] dark:hover:text-[#b23d43] transition-all"
                        onMouseEnter={() => setType("hover-item")}
                        onMouseLeave={() => setType("default")}
                      >
                        binhnnt.98@gmail.com
                      </a>
                    </div>
                    <div className="flex flex-col">
                      <div className="font-light text-gray-500">
                        My phone number
                      </div>
                      <a
                        href="tel:039 766 56 60"
                        className="font-bold text-lg text-[#333] dark:text-[#fff] hover:text-[#b23d43] dark:hover:text-[#b23d43] transition-all"
                        onMouseEnter={() => setType("hover-item")}
                        onMouseLeave={() => setType("default")}
                      >
                        +84 39 766 56 60
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-12">
                    <a
                      className="text-[#333] dark:text-[#fff] hover:text-[#3b5998] dark:hover:text-[#3b5998] transition-all text-4xl"
                      href="https://www.facebook.com/thanhbinh2501"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FontAwesomeIcon icon={faFacebook as IconProp} />
                    </a>
                    <a
                      className="text-[#333] dark:text-[#fff] hover:text-[#bc2a8d] dark:hover:text-[#bc2a8d] transition-all text-4xl"
                      href="https://www.instagram.com/thanhbinh98_/?hl=vi"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-instagram"></i>
                      <FontAwesomeIcon icon={faInstagram as IconProp} />
                    </a>
                    <a
                      className="text-[#333] dark:text-[#fff] hover:text-[#0e76a8] dark:hover:text-[#0e76a8] transition-all text-4xl"
                      href="https://www.linkedin.com/in/binh-nguyen-7295b1225"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FontAwesomeIcon icon={faLinkedinIn as IconProp} />
                    </a>
                    <a
                      className="text-[#333] dark:text-[#fff] hover:text-[#171515] dark:hover:text-[#171515] transition-all text-4xl"
                      href="https://github.com/binhnguyen2501"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FontAwesomeIcon icon={faGithub as IconProp} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-2">
                <input
                  {...register("name", {
                    required: "Please let me know your name.",
                  })}
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full mb-1 text-lg text-[#333] h-[44px] leading-6 pl-4 border-[1px] border-[#ddd] outline-hidden rounded-lg appearance-none"
                />
                <p className="text-red-500 font-medium">
                  {errors?.name?.message}
                </p>
              </div>
              <div className="mb-2">
                <input
                  {...register("email", {
                    required: "Please let me know your email too.",
                  })}
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  className="w-full mb-3 text-lg text-[#333] h-[44px] leading-6 pl-4 border-[1px] border-[#ddd] outline-hidden rounded-lg appearance-none"
                />
                <p className="text-red-500 font-medium">
                  {errors?.email?.message}
                </p>
              </div>
              <div className="text-[#333]">
                <Controller
                  control={control}
                  name="budget"
                  rules={{
                    required:
                      "I need a little budget to make the perfect product for you.",
                  }}
                  render={({ field: { onChange, value } }) => (
                    <div className="mb-2 relative">
                      <select
                        id="budget"
                        defaultValue="Budget"
                        onChange={onChange}
                        value={value}
                        style={{ cursor: "pointer" }}
                        className="w-full bg-white mb-3 text-lg h-[44px] leading-6 pl-4 border-[1px] border-[#ddd] outline-hidden rounded-lg appearance-none"
                      >
                        <option>Budget</option>
                        <option value="100-500">$100 - $500</option>
                        <option value="500-1000">$500 - $1000</option>
                        <option value="1000-2000">$1000 - $2000</option>
                        <option value="over 2000">$2000+</option>
                      </select>
                      <FontAwesomeIcon
                        icon={faArrowAltCircleDown as IconProp}
                        className="absolute top-4 right-4"
                      />
                      <p className="text-red-500 font-medium">
                        {errors?.budget?.message}
                      </p>
                    </div>
                  )}
                />
              </div>
              <div className="text-[#333]">
                <Controller
                  control={control}
                  name="description"
                  rules={{ required: "Let me know your description." }}
                  render={({ field: { onChange, value } }) => (
                    <React.Fragment>
                      <textarea
                        id="description"
                        onChange={onChange}
                        value={value}
                        rows={7}
                        placeholder="Project Description"
                        className="w-full text-lg leading-6 pl-4 py-2 border-[1px] border-[#ddd] outline-hidden rounded-lg appearance-none"
                      ></textarea>
                      <p className="text-red-500 font-medium">
                        {errors?.description?.message}
                      </p>
                    </React.Fragment>
                  )}
                />
              </div>
              <button type="submit" className="md:w-[144px] w-full">
                <ButtonStyled
                  text="Send to me"
                  isForm={true}
                  isLoading={isLoading}
                ></ButtonStyled>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="lg:hidden block">
        <Footer />
      </div>
      <AnimatePresence initial={false} exitBeforeEnter={true}>
        <Modal
          showModal={showModal}
          isSuccess={isSuccess}
          closeModal={() => setShowModal(!showModal)}
        />
      </AnimatePresence>
    </React.Fragment>
  );
};

export default Contact;
