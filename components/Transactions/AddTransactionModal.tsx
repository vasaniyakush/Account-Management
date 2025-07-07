"use client";

import { useAccounts } from "@/app/api/services/accounts";
import { useCreateAccount } from "@/app/api/services/transactions";
import {
  CreateTransactionDto,
  TransactionStatus,
  TransactionType,
} from "@/app/types/transaction";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatAmount, parseAmount } from "@/components/utils";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
// const formatAmount = (value: string) => {
//   if (!value) return "";

//   const [intPart, decimalPart] = value.replace(/,/g, "").split(".");
//   const num = Number(intPart);

//   if (isNaN(num)) return "";

//   const formattedInt = num.toLocaleString("en-IN");

//   return decimalPart !== undefined
//     ? `${formattedInt}.${decimalPart}`
//     : formattedInt;
// };

// const parseAmount = (formatted: string) => {
//   return formatted.replace(/,/g, "");
// };
export default function AddTransactionModal({ isOpen, onClose }: ModalProps) {
  const { data: session, status } = useSession();
  const [form, setForm] = useState<CreateTransactionDto>({
    type: TransactionType.DEBIT,
    amount: "",
    status: TransactionStatus.COMPLETED,
    account1: "",
    account2: "",
    message: "",
    note: "",
    category: "",
    visible: true,
  });
  const { mutate: createTransaction } = useCreateAccount(
    //@ts-ignore
    session?.authToken || ""
  );
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const {
    error,
    data: accounts,
    isFetching,
  } = useAccounts(
    //@ts-ignore
    session?.authToken,
    status == "authenticated"
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!form.account1 || form.account1.trim() == "")
      errors.account1 = "Account 1 is required";
    if (!form.amount || Number(form.amount) <= 0)
      errors.amount = "Amount must be greater than zero";
    if (!form.message) errors.message = "Message is required";

    if (
      (form.type === "SELF_DEDUCT" || form.type === "DEBIT") &&
      parseFloat(form.amount) >
        parseFloat(
          accounts?.find((a) => a.id === form.account1)?.balance || "0"
        )
    ) {
      errors.amount = "Amount exceeds balance of Account 1";
    }

    // Conditional check for SELF_DEDUCT
    if (form.type === "SELF_DEDUCT" && !form.account2) {
      errors.account2 = "Account 2 is required for SELF_DEDUCT";
    }

    return errors;
  };

  const handleToggle = () => {
    setForm((prev) => ({ ...prev, visible: !prev.visible }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    } else {
      setFormErrors({});
    }
    // Example POST request
    try {
      createTransaction(form, {
        onError: (error) => {
          console.error("Error creating transaction:", error);
          throw error;
        },
        onSuccess: () => {
          console.log("Transaction created successfully");
          setForm({
            type: TransactionType.DEBIT,
            amount: "0.00",
            status: TransactionStatus.COMPLETED,
            account1: "",
            account2: "",
            message: "",
            note: "",
            category: "",
            visible: true,
          });
          onClose();
          setFormErrors({});
          console.log("Transaction created successfully");
        },
      });
    } catch (error) {
      console.error(error);
      setFormErrors({
        api: "Failed to create transaction. Please try again.",
      });
      return;
    }
  };

  useEffect(() => {
    console.log("formdata", form);
  }, [form]);
  return (
    <>
      {isOpen && (
        <div
          id="modal-backdrop"
          className="fixed inset-0 bg-opacity-5 bg-black  z-40 overflow-y-scroll"
          onClick={onClose}
        >
          {/* Modal Content */}
          <div className="fixed inset-0 z-50 bg-opacity-5 bg-black-100 flex items-center justify-center px-4 mt-10">
            <div
              className="relative bg-gradient-to-br from-purple-800/20 to-white-800/30 rounded-xl shadow-xl w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
              <motion.h1 className="text-2xl font-bold text-white-300  text-center px-2">
                Add Transaction
              </motion.h1>
              <form
                onSubmit={handleSubmit}
                className="max-w-xl mx-auto p-2 rounded-2xl space-y-6 shadow-xl"
              >
                {/* Type */}
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    {Object.keys(TransactionType).map((type) => {
                      return (
                        <li className="me-2" key={type}>
                          <button
                            type="button"
                            onClick={() =>
                              setForm((prev) => ({
                                ...prev,
                                type: TransactionType[
                                  type as keyof typeof TransactionType
                                ],
                              }))
                            }
                            className={`inline-block px-2 py-2 rounded-lg transition-colors duration-300 ${
                              form.type === type
                                ? "bg-purple-600 text-white"
                                : "border border-purple-100 text-white hover:text-gray-800 hover:bg-gray-100 "
                            }`}
                          >
                            {type}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Amount */}
                <label
                  htmlFor="amount"
                  className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
                >
                  Amount
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-white-900 bg-purple-600 border border-purple-600 rounded-s-md ">
                    <Image
                      src="/rupee.svg"
                      alt="Rupee Icon"
                      width={20}
                      height={20}
                      className="inline mr-2"
                    />
                  </span>
                  <input
                    required={true}
                    value={formatAmount(form.amount)}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        amount: parseAmount(e.target.value),
                      }))
                    }
                    name="amount"
                    type="text"
                    inputMode="decimal"
                    id="amount"
                    className="rounded-none rounded-e-lg bg-purple-100 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  "
                    placeholder="1000.00"
                  />
                </div>
                {formErrors.amount && (
                  <p className="text-sm text-red-500 mt-1">
                    {formErrors.amount}
                  </p>
                )}

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500">
                    {Object.keys(TransactionStatus).map((status) => {
                      return (
                        <li className="me-2" key={status}>
                          <button
                            type="button"
                            onClick={() =>
                              setForm((prev) => ({
                                ...prev,
                                status:
                                  TransactionStatus[
                                    status as keyof typeof TransactionStatus
                                  ],
                              }))
                            }
                            className={`inline-block px-2 py-2 rounded-lg transition-colors duration-300 ${
                              form.status === status
                                ? "bg-purple-600 text-white"
                                : "border border-purple-100 text-white hover:text-gray-800 hover:bg-gray-100 "
                            }`}
                          >
                            {status}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Account 1 */}
                <div>
                  <label
                    htmlFor="account1"
                    className="block mb-2 text-sm font-medium text-white-900 "
                  >
                    Select Account 1
                  </label>
                  <select
                    required={true}
                    id="account1"
                    name="account1"
                    value={form.account1}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, account1: e.target.value }))
                    }
                    className="bg-purple-100 border border-purple-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 max-w-xl"
                  >
                    {accounts?.map((account) => (
                      <option key={account.id} value={account.id}>
                        {`${account.name.padEnd(20, " ")} - ₹${
                          account.balance
                        }`}
                      </option>
                    ))}
                    <option value="" disabled>
                      Select an account
                    </option>
                  </select>
                </div>
                {formErrors.account1 && (
                  <p className="text-sm text-red-500 mt-1">
                    {formErrors.account1}
                  </p>
                )}

                {/* Account 2 (conditional) */}
                {form.type === "SELF_DEDUCT" && (
                  <>
                    <div>
                      <label
                        htmlFor="account1"
                        className="block mb-2 text-sm font-medium text-white-900 "
                      >
                        Select Account 2
                      </label>
                      <select
                        required={true}
                        id="account2"
                        name="account2"
                        value={form.account2}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            account2: e.target.value,
                          }))
                        }
                        className="bg-purple-100 border border-purple-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 max-w-xl"
                      >
                        {accounts
                          ?.filter((a) => a.id != form.account1)
                          .map((account) => (
                            <option key={account.id} value={account.id}>
                              {`${account.name.padEnd(20, " ")} - ₹${
                                account.balance
                              }`}
                            </option>
                          ))}

                        <option value="" disabled>
                          Select an account
                        </option>
                      </select>
                    </div>
                    {formErrors.account2 && (
                      <p className="text-sm text-red-500 mt-1">
                        {formErrors.account2}
                      </p>
                    )}
                  </>
                )}

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <input
                    required={true}
                    type="text"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Enter a message"
                    maxLength={30}
                    className="w-full bg-gradient-to-br from-purple-800/20 to-white-800/30 text-white border border-purple-100 rounded-lg p-2"
                  />
                </div>
                {formErrors.message && (
                  <p className="text-sm text-red-500 mt-1">
                    {formErrors.message}
                  </p>
                )}

                {/* Note */}
                <div>
                  <label className="block text-sm font-medium mb-1">Note</label>
                  <textarea
                    name="note"
                    value={form.note}
                    onChange={handleChange}
                    rows={2}
                    autoCapitalize="words"
                    placeholder="Enter a note (optional)"
                    className="w-full bg-gradient-to-br from-purple-800/20 to-white-800/30 text-white border border-purple-100 rounded-lg p-2"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Enter a category (optional)"
                    className="w-full bg-gradient-to-br from-purple-800/20 to-white-800/30 text-white border border-purple-100 rounded-lg p-2"
                  />
                </div>

                {/* Visible Toggle */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Visible</label>
                  <button
                    type="button"
                    onClick={handleToggle}
                    className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${
                      form.visible ? "bg-purple-600" : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        form.visible ? "translate-x-6" : ""
                      }`}
                    ></span>
                  </button>
                </div>

                {/* Submit */}
                {formErrors.api && (
                  <p className="text-sm text-red-500 mt-1">{formErrors.api}</p>
                )}
                <div>
                  <button
                    type="submit"
                    className="w-full bg-purple-700 hover:bg-purple-800 text-white py-2 rounded-lg font-semibold transition"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
