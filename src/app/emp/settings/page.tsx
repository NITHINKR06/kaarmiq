'use client'

import Image from "next/image";
import { FaFilePdf } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoMdLock } from "react-icons/io";
import { FcKey } from "react-icons/fc";

import NavBarEmpProfile from "@/components/NavBar/NavBarEmpProfile";
import { ToastContainer, toast } from 'react-toastify';
import { FiMapPin } from "react-icons/fi";


interface EmployeeDetails {
  // employeeId: string;
  fullname: string;
  phoneno?: number;
  jobRole: string;
  experience: string;
  aboutme: string;
  dob?: string;
  place: string;
  level: string;
  reviews?: { reviewText: string; rating: number }[];
  pendingWork?: string[];
  requestsPending?: string[];
  imagesOfWork?: string[];
  salary?: number;
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
  const [oldPassword, setOldPassword] = useState('');
  const [reOldPassword, setReOldPassword] = useState('');
  const [passKey, setPassKey] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  useEffect(() => {
    const handleSubmit = async () => {
      if (oldPassword !== reOldPassword) {
        alert('Passwords do not match!');
        return;
      }
      try {
        const response = await axios.post('/api/password-update', {
          oldPassword,
          newPassword,
          passKey,
        });
        alert(response.data.message);
      } catch (error:any) {
        console.error(error);
        alert(error.response.data.message || 'Error updating password');
      }
    };
  })


  const [formData, setFormData] = useState({
    fullname: "",
    phoneno: "",
    jobRole: "",
    experience: "",
    aboutme: "",
    dob: "",
    place: "",
    level: "",
    salary: "",
    locality: "",
  });

  console.log('This is from the app/emp/settings/page.tsx @line 63', formData)

  // console.log(employee)
  // console.log(employeeId,"this is from emp/settings employee id")
  
  // Fetch employee data
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`/api/employee/empdata`);
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
      <NavBarEmpProfile/>
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
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                              fill=""
                            />
                          </g>
                        </svg>
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
                    <input
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary cursor-not-allowed"
                      type="text"
                      name="Username"
                      id="Username"
                      placeholder="Username"
                      // onChange={handleChange}
                      defaultValue={employee?.username}
                      disabled
                    />
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
                          <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                fill=""
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                fill=""
                              />
                            </g>
                          </svg>
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
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="phoneno"
                        id="phoneno"
                        placeholder="Contact number"
                        value={formData.phoneno}
                        onChange={handleInputChange}
                      />
                    </div>
                </div>
                
                  {/* Job Name  */}
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="jobRole"
                    >
                      Job Role
                    </label>
                    <select
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      name="jobRole"
                      id="jobRole"
                      value={formData.jobRole}
                      onChange={handleJobRoleChange}
                    >
                      <option value="" disabled>
                        Select a Job Role
                      </option>
                      <option value="electronic-home-service">Electronic Home Service</option>
                      <option value="plumbing">Plumbing</option>
                      <option value="electrician">Electrician</option>
                      <option value="cleaning-services">Cleaning Services</option>
                      <option value="gardening">Gardening</option>
                      <option value="appliance-repair">Appliance Repair</option>
                      <option value="pest-control">Pest Control</option>
                      <option value="painting">Painting</option>
                      <option value="others">Others</option>
                    </select>
                  </div>

                 <div className="mb-5.5">{/* this felid for address */}
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                    >
                      Your Locality or Place (City, District, State, Pincode)
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="place"
                        value={formData.place}
                        onChange={handleInputChange}
                        placeholder="City, District, State, Pincode"
                      />
                      <FiMapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>
                  </div>

                {/* Experience and DOB */}
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">{/* Experience Field */}
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Years of Experience
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          placeholder="Experience"
                          min="1"
                          max="30"
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2"> {/* Date of birth */}
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Date of birth
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        placeholder="Enter your DOB"
                      />
                    </div>
                </div>

                {`TODO: here in about section change the input feild to textarea feils || imp `}
                <div className="mb-5.5"> {/* About me or Bio */}
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      BIO
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_88_10224">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
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
                          placeholder={"New Password"}
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

                  {/* File Upload Section for photo */}
                  <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {/* SVG paths for the icon */}
                        </svg>
                      </span>
                      <p>
                        <span className="text-primary">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                      <p>(max, 800 X 800px)</p>
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

            {/* <br /> */}

            {/* Resume section */}
            <div className="mt-7 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Your Resume
                </h3>
              </div>
              <div className="p-7">
                <div className="flex justify-between">
                  <span className="text-black dark:text-white">
                    Download Resume
                  </span>
                  <div className="flex items-center justify-center gap-1">
                    <FaFilePdf className="text-xl" />
                    <span className="text-black dark:text-white">Resume.pdf</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
