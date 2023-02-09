import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmarkCircle,
  faCircleCheck,
} from "@fortawesome/free-regular-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import Overlay from "../components/Overlay";

interface Props {
  showModal: boolean;
  closeModal(): void;
  isSuccess: boolean;
}

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Modal = ({ showModal, closeModal, isSuccess }: Props) => {
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showModal]);

  return (
    <React.Fragment>
      {showModal && (
        <Overlay>
          <motion.div
            style={{
              width: "clamp(500px, 50%, 400px)",
              height: "min(50%, 250px)",
            }}
            className="bg-white dark:bg-[#333] z-[99999] py-4 px-6 mx-2 rounded-lg shadow-xl text-gray-800 dark:text-white"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex flex-col">
              <div
                className="text-right text-2xl cursor-pointer"
                onClick={() => closeModal()}
              >
                <FontAwesomeIcon icon={faXmarkCircle}></FontAwesomeIcon>
              </div>
              <div className="flex flex-col">
                <div
                  className={`text-center text-[4rem] ${
                    isSuccess ? "text-green-500" : "text-red-500"
                  } `}
                >
                  {isSuccess ? (
                    <FontAwesomeIcon icon={faCircleCheck}></FontAwesomeIcon>
                  ) : (
                    <FontAwesomeIcon
                      icon={faCircleExclamation}
                    ></FontAwesomeIcon>
                  )}
                </div>
                <div className="text-lg font-bold text-center">
                  {isSuccess ? (
                    <div>
                      Thank you for your message, I will be in touch with you in
                      no time.
                    </div>
                  ) : (
                    <div>
                      Oops there was a problem with something unexpected. Please
                      try again later or email me directly!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </Overlay>
      )}
    </React.Fragment>
  );
};

export default Modal;
