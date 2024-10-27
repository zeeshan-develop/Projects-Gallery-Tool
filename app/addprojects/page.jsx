"use client";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "@/lib/firebase";
import Swal from "sweetalert2";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { usePosts } from "@/context/AppContext";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  message: Yup.string().required("Message is required"),
  technologies: Yup.array().min(1, "At least one technology must be selected"),
  githubUrl: Yup.string().url("Invalid URL").required("GitHub URL is required"),
  linkedinUrl: Yup.string()
    .url("Invalid URL")
    .required("LinkedIn URL is required"),
  file_input: Yup.mixed().test("fileSize", "File is required", (value) => {
    return value && value[0] && value[0].size <= 2000000; // 2MB limit
  }),
});

const AddProject = () => {
  const { getPosts } = usePosts();
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      const timer = setTimeout(() => {
        toast.error("You must be logged in to create posts.");
        router.push("/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [session, router]);
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      technologies: [],
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const onSubmit = async (data) => {
    const file = data.file_input ? data.file_input[0] : null;
    if (file) {
      const storage = getStorage(app);
      const storageRef = ref(storage, `gallerytool/${file.name}`);
      await uploadBytes(storageRef, file);
      const fileURL = await getDownloadURL(storageRef);
      data.image = fileURL;
    }

    delete data.file_input;

    const db = getFirestore(app);
    await setDoc(doc(db, "posts", Date.now().toString()), {
      ...data,
    });

    Swal.fire({
      icon: "success",
      title: "Submission Successful",
      text: "Your data has been submitted successfully!",
      confirmButtonText: "Ok",
    }).then(() => {
      reset();
    });
    getPosts().catch(() => {
      toast.error("Error uploading file. Please try again.");
    });
  };

  return (
    <div>
      <div className="text-center mb-4">
        <h1 className="sm:text-3xl text-2xl font-bold title-font text-blue-500 mb-4">
          ADD PROJECT
        </h1>
        <div className="flex mt-6 justify-center">
          <div className="w-16 h-1 rounded-full bg-gray-400 inline-flex"></div>
        </div>
      </div>
      <FormProvider {...methods}>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-semibold text-gray-500 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Title"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <label
            htmlFor="message"
            className="block mb-2 text-sm font-semibold text-gray-500 dark:text-white"
          >
            Your message
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-500 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
            {...register("message")}
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">
              {errors.message.message}
            </p>
          )}
          <h3 className="my-4 font-semibold text-gray-500 dark:text-white">
            Technologies
          </h3>
          <ul className="flex flex-wrap items-center w-full text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-2">
            {[
              "JavaScript",
              "Next Js",
              "FireBase",
              "React",
              "Flask",
              "Redux Tool Kit",
              "React Native",
              "C#",
              "Express js",
              "TypeScript",
              "Python",
              "Django",
            ].map((tech) => (
              <li key={tech}>
                <div className="flex items-center ps-3">
                  <input
                    id={`${tech}-checkbox`}
                    type="checkbox"
                    value={tech}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    {...register("technologies")}
                  />

                  <label
                    htmlFor={`${tech}-checkbox`}
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-500 dark:text-gray-300"
                  >
                    {tech}
                  </label>
                </div>
              </li>
            ))}
          </ul>
          {errors.technologies && (
            <p className="text-red-500 text-xs my-2">
              {errors.technologies.message}
            </p>
          )}

          <div className="mb-5">
            <input
              type="text"
              id="githubUrl"
              className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="GitHub Url"
              {...register("githubUrl")}
            />
            {errors.githubUrl && (
              <p className="text-red-500 text-xs mt-1">
                {errors.githubUrl.message}
              </p>
            )}
          </div>
          <div className="mb-5">
            <input
              type="text"
              id="linkedinUrl"
              className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="LinkedIn Url"
              {...register("linkedinUrl")}
            />
            {errors.linkedinUrl && (
              <p className="text-red-500 text-xs mt-1">
                {errors.linkedinUrl.message}
              </p>
            )}
          </div>

          <div className="w-full max-w-[600px] mb-4">
            <label
              htmlFor="file"
              className="block mb-2 text-sm font-bold text-gray-500"
            >
              Upload file
            </label>
            <input
              className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
              id="file_input"
              type="file"
              {...register("file_input")}
            />
            {errors.file_input && (
              <p className="text-red-500 text-xs mt-1">
                {errors.file_input.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddProject;
