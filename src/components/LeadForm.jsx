import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function LeadForm() {
  const [status, setStatus] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const handleSubmitForm = (data) => {
    console.log(data, "kd here");

    reset();
  };

  const handleFollowUpChange = (e) => {
    e.preventDefault();
    setStatus(e.target.value);
    console.log(e.target.value, "kd ka target");
  };

  return (
    <>
      <section className="max-w-4xl p-6 mx-auto bg-black rounded-md shadow-md dark:bg-gray-800 mt-20">
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">
          Account settings
        </h1>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                {...register("username")}
                type="text"
                placeholder="please enter profile name"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="emailAddress"
              >
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                {...register("email")}
                placeholder="enter email address"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="passwordConfirmation"
              >
                Mobile
              </label>
              <input
                type="tel"
                {...register("phone")}
                placeholder="phone"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="passwordConfirmation"
              >
                Source
              </label>
              <select
                {...register("source", { required: "this field is required" })}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option disabled selected>
                  select the source
                </option>
                <option value={`website`}>website</option>
                <option value={`offline`}>offline</option>
                <option value={`trade show`}>trade show</option>
                <option value={`indiamart`}>indiamart</option>
              </select>
            </div>

            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="passwordConfirmation"
              >
                Remarks
              </label>
              <input
                id="textarea"
                {...register("remarks")}
                type="text"
                placeholder="enter remarks here"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                defaultValue={""}
              />
            </div>

            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="passwordConfirmation"
              >
                Follow up
              </label>
              <select
                {...register("followup", {
                  required: "this field is required",
                })}
                value={status}
                onClick={handleFollowUpChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option value={""} disabled selected>
                  status
                </option>
                <option value={`callback`}>Call-Back</option>
                <option value={`not interested`}>Not-interested</option>
                <option value={`dead lead`}>Dead Lead</option>
              </select>
            </div>

            {status === "callback" && (
              <>
                <div>
                  <label
                    className="text-white dark:text-gray-200"
                    htmlFor="passwordConfirmation"
                  >
                    follow up date
                  </label>
                  <input
                    type="date"
                    {...register("followupddate")}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                </div>
                <div>
                  <label
                    className="text-white dark:text-gray-200"
                    htmlFor="passwordConfirmation"
                  >
                    remarks
                  </label>
                  <input
                    type="text"
                    placeholder="enter remarks..."
                    {...register("followUpRemarks")}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
