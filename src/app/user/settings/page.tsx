'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoMdLock } from "react-icons/io";
import { FcKey } from "react-icons/fc";
import { MdOutlineAttachEmail } from "react-icons/md";
import { LuUserRoundPen } from "react-icons/lu";
import { CgRename } from "react-icons/cg";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FiSmartphone } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import NavBar from "@/components/NavBar/Navbar";


interface EmployeeDetails {
  // employeeId: string;
  fullname: string;
  phoneno?: number;
  aboutme: string;
  dob?: string;
  place: string;
  pendingWork?: string[];
  requestsPending?: string[];
  imagesOfWork?: string[];
}

interface Employee {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

const Settings = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [employeeId, setEmployeeId] = useState("");
  const [employeeDetails, setEmployeeDetails] = useState<EmployeeDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const [formData, setFormData] = useState({
    fullname: "",
    phoneno: "",
    aboutme: "",
    dob: "",
    place: "",
    locality: "",
  });

  console.log('This is from the app/emp/settings/page.tsx @line 63', formData)

  // console.log(employee)
  // console.log(employeeId,"this is from emp/settings employee id")

  // Fetch employee data
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`/api/users/me`);
        const data = await res.data.data;
        // console.log(data,"Employee data from the setting")
        // console.log(data._id,'employee id to get infromation!!')
        // console.log(data,'employee id to get infromation!!')
        setEmployee(data);
        setEmployeeId(data._id)
      } catch (error: any) {
        console.error('Error fetching employee data:', { error: error.message });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployee();
  }, []);


  useEffect(() => {
    const handleFetchDetails = async () => {
      if (!employeeId) return;
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/employee/empdetails`, {
          params: { employeeId },
        });
        const data = await response.data.data;
        console.log(data,'this is from the empdetails /api/employee/empdetails -- line no @96')
        setEmployeeDetails(data);
        setFormData(data);
        console.log(data,'data from /api/employee/empdetails ')
      } catch (err: any) {
        setError(err.message);
        console.log(
          { err: err.message },
          "Error fetching employee details from /api/employee/empdetails"
        );
      } finally {
        setLoading(false);
      }
    };

    handleFetchDetails();
  }, [employeeId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for updating employee details
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateLoading(true);
    setUpdateError(null);
    try {
      const response = await axios.put(`/api/employee/empupdate`, {
        employeeId,
        ...formData,
      });
      const updatedData = await response.data.data;
      toast.success('Employee Updated Successfully', {
        position: 'top-center',
        autoClose: 2000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setEmployeeDetails(updatedData);
      console.log(updatedData,'This is from the app/emp/settings/page.tsx @line 144')
    } catch (err: any) {
      setUpdateError(err.message);
      toast.error("Error updating employee details");
      console.error("Error updating employee details:", err.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleJobRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
    

  return (
    <div>
      <ToastContainer/>
      <NavBar/>
      <div className="mx-auto max-w-270 pt-25">
        {/* <Breadcrumb pageName="Settings" /> */}

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            {/* this is only email and username */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Basic Information
                </h3>
              </div>

              <div className="p-7 ">
              <span>Note: If you want to modify this feild please contact admin <span className="text-blue-300">kaarmiqofficial@gmail.com</span></span>
                  <div className="mb-5.5">{/* Email */}
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="emailAddress"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <MdOutlineAttachEmail/>
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary cursor-not-allowed"
                        type="email"
                        name="emailAddress"
                        id="emailAddress"
                        placeholder={"Email"}
                        // onChange={handleChange}
                        defaultValue={employee?.email}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">{/* User Name */}
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      Username
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <CgRename/>
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary cursor-not-allowed"
                        type="text"
                        name="Username"
                        id="Username"
                        placeholder="Username"
                        // onChange={handleChange}
                        defaultValue={employee?.username}
                        disabled
                      />
                    </div>
                  </div>

                  {/* Cancel and save button */}
                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white cursor-not-allowed"
                      type="submit"
                      disabled
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90 cursor-not-allowed"
                      type="submit"
                      disabled
                      // onClick={handleSubmit}
                    >
                      Save
                    </button>
                  </div>

              </div>
            </div>

            <br />

            {/* this is for personal infromation */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Personal Information
                </h3>
              </div>

              <div className="p-7">
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">{/* full Name */}
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Full Name
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <LuUserRoundPen/>
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="fullname"
                          value={formData.fullname}
                          onChange={handleInputChange}
                          placeholder="Full Name"
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2"> {/* Phone number */}
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Phone Number
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FiSmartphone/>
                        </span>
                        
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="phoneno"
                          id="phoneno"
                          placeholder="Contact number"
                          value={formData.phoneno}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                </div>
                
                 <div className="mb-5.5">{/* this felid for address */}
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                    >
                      Your Locality or Place (City, District, State, Pincode)
                    </label>
                    <div className="relative">
                      <FaMapLocationDot className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="place"
                        value={formData.place}
                        onChange={handleInputChange}
                        placeholder="City, District, State, Pincode"
                      />
                    </div>
                  </div>

                
                <div className="mb-5.5"> {/* About me or Bio */}
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      BIO
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <MdDriveFileRenameOutline/>
                      </span>

                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="aboutme"
                        value={formData.aboutme}
                        onChange={handleInputChange}
                        placeholder="About Me"
                        // onChange={handleInputChange}
                      ></input>
                    </div>
                </div>
                  
                {/* Cancel and save button */}
                <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                      onClick={handleFormSubmit}
                      disabled={updateLoading}
                    >
                      {updateLoading ? "Updating..." : "Save"}
                    </button>
                </div>
              </div>
            </div>
          </div>

          {/*Password, Profile and Resume Section */}
          <div className="col-span-5 xl:col-span-2">

            {/* password section */}      
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Password Update
                  </h3>
                </div>
                <div className="p-7">
                  <form action="#">
                    <div className="mb-5.5">{/* Password */}
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="emailAddress"
                      >
                        Enter Old Password
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <IoMdLock className="h-full w-full"/>
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="password"
                          name="password"
                          id="password"
                          placeholder={"Password"}
                          // onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="mb-5.5">{/* Password */}
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="emailAddress"
                      >
                        Re-enter Old Password
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <IoMdLock className="h-full w-full"/>
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="password"
                          name="repassword"
                          id="repassword"
                          placeholder={"Re-enter Password"}
                          // onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="mb-5.5">{/* Password */}
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="emailAddress"
                      >
                        Verify Pass-Key
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FcKey className="h-full w-full"/>
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="passkey"
                          id="passkey"
                          placeholder={"Check your email for pass-key"}
                          // onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Cancel and save button */}
                    {`TODO: add emailsend to this to send passkey that genarated by the backend and verify that /app/emp/settings/page.tsx`}
                    <div className="flex justify-end gap-4.5">
                      <button
                        className="flex justify-center items-center rounded border border-stroke px-6 py-2 text-black hover:shadow-1 dark:border-strokedark dark:text-white text-xs font-bold bg-green-200"
                        type="submit"
                      >
                        Send Pass-key 
                      </button>

                      <button
                        className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        type="submit"
                      >
                        Cancel
                      </button>
                      <button
                        className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                        type="submit"
                        // onClick={handleSubmit}
                      >
                        Save
                      </button>
                    </div>

                  </form>
                </div>
            </div>

            <br />
            
            {/* photo section */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Your Photo
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-14 w-14 rounded-full">
                      <Image
                        src={"/images/user/user-03.png"}
                        width={55}
                        height={55}
                        alt="User"
                      />
                    </div>
                    <div>
                      <span className="mb-1.5 text-black dark:text-white">
                        Edit your photo
                      </span>
                      <span className="flex gap-2.5">
                        <button className="text-sm hover:text-primary">
                          Delete
                        </button>
                        <button className="text-sm hover:text-primary">
                          Update
                        </button>
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4">
                    <button
                      className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
