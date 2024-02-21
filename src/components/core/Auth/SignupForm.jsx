import React, { useState } from 'react'
import { ACCOUNT_TYPE } from "../../../utils/constants"
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setSignupData } from "../../../slices/authSlice"
import Tab from '../../common/Tab';

const SignupForm = () => {
  const dispatch = useDispatch();

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.FARMER);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    contact: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { firstName, lastName, email, address, contact, password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password Do Not Match")
      return;
    }

    const signupData = {
      ...formData,
      accountType,
    }

    dispatch(setSignupData(signupData))

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      contact: "",
      password: "",
      confirmPassword: "",
    })

    setAccountType(ACCOUNT_TYPE.FARMER);
  }

  const tabData = [
    {
      id: 1,
      tabName: "Farmer",
      type: ACCOUNT_TYPE.FARMER,
    },
    {
      id: 2,
      tabName: "Dealer",
      type: ACCOUNT_TYPE.DEALER,
    },
    {
      id: 3,
      tabName: "Shop Keeper",
      type: ACCOUNT_TYPE.SHOP_KEEPER,
    },
  ]

  return (
    <div>
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      <form>
         
      </form>
    </div>
  )
}

export default SignupForm
