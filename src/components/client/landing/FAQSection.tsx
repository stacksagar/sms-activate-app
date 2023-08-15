import FIcon from "@/common/FIcon";
import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";

import React from "react";

const AccordionItem = ({ header, ...rest }: any) => (
  <Item
    {...rest}
    header={({ state: { isEnter } }: any) => (
      <div className="w-full flex items-center justify-between">
        <h6 className="px-2">{header}</h6>
        {isEnter ? <FIcon icon="chevron-up" /> : <FIcon icon="chevron-down" />}
      </div>
    )}
    className="border-b"
    buttonProps={{
      className: ({ isEnter }: any) =>
        `flex w-full p-4 text-left  ${
          isEnter && "bg-slate-200 dark:bg-gray-800"
        }`,
    }}
    contentProps={{
      className: "transition-height duration-200 ease-out",
    }}
    panelProps={{ className: "p-4" }}
  />
);

export default function FAQSection() {
  return (
    <section className="landing_section" id="faq">
      <div className="container">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
              <span className="section_sub_title">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="section_title">
                Take a look at the most asked questions.
              </h2>
            </div>
          </div>
        </div>

        <div className="my-4 border-t lg:w-[800px] mx-auto">
          {/* `transitionTimeout` prop should be equal to the transition duration in CSS */}
          <Accordion transition transitionTimeout={200}>
            <AccordionItem header="What does We provides??" initialEntered>
              Simply, it is a virtual number service that you can receive SMS
              from various websites. When you don`t feel comfortable sharing
              your personal number to register on a website, you can use one of
              our disposable numbers to receive text messages. There are many
              more use cases for virtual numbers. You can receive an SMS via our
              service for any reason you need.
            </AccordionItem>

            <AccordionItem header="Does virtual numbers trustworthy?">
              Our virtual number service is 100% secure. The numbers you receive
              SMS are disposable virtual numbers for one-time use only and
              cannot be used again for any reason. If you would like to receive
              multiple SMS to the same number, you can use our rental service.
              We don`t collect any personal information at all so it is not
              possible for us to share your personal information with third
              parties.
            </AccordionItem>

            <AccordionItem header="Can I use the same number again?">
              We have two different services for that matter. With the regular
              SMS service, the numbers are disposable SMS numbers for one-time
              use only. Therefore it is not possible to receive another SMS to
              the same number again. However, with the rental service, you can
              receive as many SMS as you want during the rental time. Which can
              be rented from 4 hours to 8 weeks.
            </AccordionItem>

            <AccordionItem header="What happens if I don't receive an SMS?">
              You will get a full refund! If you don`t receive the SMS you
              expect for any reason in 10 minutes from the time of your order,
              your order will be cancelled and full amount will be refunded to
              your account automatically. It is also possible to cancel the
              number you purchased without any reason and get full amount
              refunded to your account immediately.
            </AccordionItem>
            <AccordionItem header="Why should I use virtual SMS numbers?">
              The main reason is privacy. When you register on a website or a
              service that you need to use regularly or one-time only, you don`t
              feel comfortable sharing your personal phone number to verify your
              identity. With our virtual number service, you can instantly
              choose a number and get SMS from the service you would like to use
              and protect your privacy.
            </AccordionItem>
            <AccordionItem header="What is number rental service?">
              If you don`t want to receive a single SMS to a disposable virtual
              number, you can rent similar virtual numbers to receive unlimited
              SMS to the rented number during the rental time. It is possible to
              rent a virtual number from 4 hours to 8 weeks. Long-term rentals
              are better for cases like when websites require 2FA to log in to
              your account or OTP for taking important actions on your account.
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
