import React from "react";
import { useForm } from "react-hook-form";
import List from "../List/List";
import { default as api } from "../.././Store/ApiSlice";
import "./form.css";

const Form = () => {
  const { register, handleSubmit, resetField } = useForm();
  const [addTransaction] = api.useAddTransactionMutation();
  const onSubmit = async (data) => {
    if (!data) {
    }
    await addTransaction(data).unwrap();
    resetField("name");
    resetField("amount");
  };
  return (
    <div className="form max-w-sm mx-auto w-96">
      <h1 className="font-bold pb-4 text-xl">Transaktion</h1>
      <form id="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="input-group">
            <input
              type="text"
              {...register("name")}
              placeholder="Gehalt, Hausmiete, Usw..."
              className="form-input"
            />
          </div>
          <select
            className="form-input group/item bg-emerald-600 text-neutral-50"
            {...register("type")}
          >
            <option value="Investment" default>
              Investition
            </option>
            <option value="Expense" default>
              Ausgabe
            </option>
            <option value="Savings" default>
              Ersparnisse
            </option>
          </select>
          <div className="input-group">
            <input
              type="text"
              placeholder="Betrag"
              {...register("amount")}
              className="form-input"
            />
          </div>
          <div className="submit-btn">
            <button className="border py-2 text-white bg-emerald-600 w-full">
              Machen Sie eine Transaktion
            </button>
          </div>
        </div>
      </form>
      <List />
    </div>
  );
};

export default Form;
