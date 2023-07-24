
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Header from './Header'
import Overview from './Overview'
import MyAssessment from './MyAssessment'
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { toast } from 'react-toastify'

const index = () => {
    // state to check whether 'unstop assessment' is selected or 'my assessment'
    const [open, setOpen] = useState(false)
    // state to check is dialog open or not, it is a dialog to add new assessment
    const [openDialog, setOpenDialog] = useState(false)
    // array to store selected skills
    const [skills, setSkills] = useState(['React', 'Next.js', 'Node', 'Express', 'MongoDb'])
    const cancelButtonRef = useRef(null)

    // state to store form data in an object
    const [formData, setFormData] = useState({
        title: '',
        purpose: '',
        questions: '',
        duration: "",
        date: new Date().toDateString().slice(3)
    });
    // upon changing the input data, formData object will be updated 
    const handleChange = (e, fieldName) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    // adding the formData to existing or main data
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        data.unshift(formData)
        setOpenDialog(false)
        toast.success('Added Successfully!')
    };

    // func to add new skills to skills array
    const addSkills = (e) => {
        if (e.key === 'Shift') {
            const newValue = e.target.value;
            setSkills((prevValues) => [...prevValues, newValue]);
            e.target.value = '';
        }
    };
    // func to remove the added skills from an array
    const removeSkills = (item) => {
        const updatedSkills = skills.filter((skill) => skill !== item);
        setSkills(updatedSkills)
    }


    return (
        <>
            <div className='flex flex-col justify-start items-start overflow-hidden'>
                <Header setOpen={setOpen} />
                {
                    open && (<>
                        <Overview data={data} />
                        <MyAssessment data={data} setOpenDialog={setOpenDialog} />
                    </>)
                }
            </div>


            <Transition.Root show={openDialog} as={Fragment}>
                <Dialog as="div" className="relative z-10 " initialFocus={cancelButtonRef} onClose={setOpenDialog}>

                    <div className="fixed inset-0 z-10 overflow-y-auto bg-black/30 bg-opacity-25">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 border-b-2 pb-2">
                                        Create New Assessment
                                    </Dialog.Title>
                                    <div className="mt-8">
                                        <p className="text-sm text-gray-500">
                                            <form onSubmit={handleSubmit}>
                                                <div className='flex flex-col gap-4 md:gap-8'>


                                                    <TextField
                                                        name="title"
                                                        type='text'
                                                        label="Title"
                                                        value={formData.title}
                                                        onChange={(e) => handleChange(e, 'title')}
                                                        required
                                                    />

                                                    <FormControl>
                                                        <InputLabel>Purpose</InputLabel>
                                                        <Select
                                                            name="purpose"
                                                            value={formData.purpose}
                                                            onChange={(e) => handleChange(e, 'purpose')}
                                                            required
                                                        >
                                                            <MenuItem value="Job">Job</MenuItem>
                                                            <MenuItem value="Intern">Intern</MenuItem>
                                                            <MenuItem value="Other">Other</MenuItem>
                                                        </Select>
                                                    </FormControl>

                                                    <TextField
                                                        name="questions"
                                                        label="Question"
                                                        type='number'
                                                        value={formData.questions}
                                                        onChange={(e) => handleChange(e, 'questions')}
                                                        required
                                                    />

                                                    <div className='flex flex-wrap justify-start items-center p-4 border-2 gap-2 rounded-lg'>
                                                        {
                                                            skills?.map((item, index) => {
                                                                return <div key={index} className='flex justify-center items-center bg-orange-300 py-1 px-4 gap-4 rounded-xl' >
                                                                    <span>{item}</span>
                                                                    <span onClick={() => removeSkills(item)} className='text-xl cursor-pointer'>×</span>
                                                                </div>
                                                            })
                                                        }
                                                    </div>
                                                    <TextField
                                                        name="skills"
                                                        label="Skills (Press 'Shift' to add)"
                                                        type='text'
                                                        onKeyUp={addSkills}
                                                    />

                                                    <TextField
                                                        name="duration"
                                                        label="Duration (HH:MM:SS)"
                                                        value={formData.duration}
                                                        onChange={(e) => handleChange(e, 'duration')}
                                                        required
                                                    />

                                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                        <button
                                                            type="submit"
                                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                        >
                                                            Deactivate
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                            onClick={() => setOpenDialog(false)}
                                                            ref={cancelButtonRef}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </p>
                                    </div>


                                </Dialog.Panel>
                            </Transition.Child>
                        </div >
                    </div >
                </Dialog >
            </Transition.Root >

        </>
    )
}

export default index


const data = [
    {
        title: 'Math Assessment',
        purpose: 'Job',
        questions: 24,
        duration: "00:04:00",
        date: '20 Apr 2023'
    },
    {
        title: 'React Assessment',
        purpose: 'Intern',
        questions: 50,
        duration: "00:02:00",
        date: '11 Sep 2023'
    },
]