import { useEffect, useState } from "react";
import { useUser} from "@clerk/clerk-react";
import { useFinancialRecords } from "../../contexts/financial-record-context";

export const FinancialRecordForm = () => {
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [otherCategory, setOtherCategory] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const { addRecord } = useFinancialRecords();
  const [otherFlag,setOtherFlag]=useState<boolean>(false);
  useEffect(() => {
    if (category === "Other") {
        setOtherFlag(true);
    }
    else{
      setOtherFlag(false);
    }
}, [category]);
  
  const { user } = useUser();
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newRecord = {
      userId: user?.id ?? "",
      date: new Date().toLocaleDateString('en-GB'),
      description: description,
      amount: parseFloat(amount),
      category: category==="Other"?otherCategory:category,
      paymentMethod: paymentMethod,
    };
    if(newRecord.userId===""){
      alert("Please SignIn");
    }
    addRecord(newRecord);
    setDescription("");
    setAmount("");
    setCategory("");
    setPaymentMethod("");
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Description:</label>
          <input
            type="text"
            required
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Amount:</label>
          <input
            type="number"
            required
            className="input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Category:</label>
          <select
            required
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a Category</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Salary">Salary</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
          
          {otherFlag?<><label>Enter Other Category:</label><input required className="input" id="other-input" value={otherCategory} onChange={(e)=>setOtherCategory(e.target.value) }/></>:""}
        </div>
        <div className="form-field">
          <label>Payment Method:</label>
          <select
            required
            className="input"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Select a Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Mobile Payment Apps">Mobile Payment Apps</option>
          </select>
        </div>
        <button type="submit" className="button add-btn">
          Add Record
        </button>
      </form>
    </div>
  );
};