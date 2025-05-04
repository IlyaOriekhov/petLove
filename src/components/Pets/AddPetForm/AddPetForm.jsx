import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPet, refreshUser } from "../../../redux/auth/operations";
import { selectTypes } from "../../../redux/notices/selectors";
import { getTypes } from "../../../redux/notices/operations";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addPetSchema } from "../../../utils/validationSchemas";
import DatePicker from "react-datepicker";
import Select from "react-select";
import Button from "../../Shared/Button/Button";
import sprite from "../../../assets/icons/sprite.svg";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./AddPetForm.module.css";

const AddPetForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sexPet, setSexPet] = useState("");
  const [petType, setPetType] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [petImageURL, setPetImageURL] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const species = useSelector(selectTypes);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addPetSchema),
    defaultValues: {
      title: "",
      name: "",
      imgURL: "",
      species: "",
      birthday: "",
      sex: "",
    },
  });

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  useEffect(() => {
    if (sexPet) {
      setValue("sex", sexPet);
    }

    if (petType) {
      setValue("species", petType);
    }

    if (birthDate) {
      setValue("birthday", birthDate);
    }
  }, [birthDate, petType, sexPet, setValue]);

  const handleChooseSex = (value) => {
    setSexPet(value);
  };

  const handleDateChange = (date) => {
    if (!date) return;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    setBirthDate(formattedDate);
    setValue("birthday", formattedDate);
  };

  const handleByType = (selected) => {
    setPetType(selected.value);
  };

  const handleUploadAvatar = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pet_app_upload");
    formData.append("cloud_name", "dxxohv4f7");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dxxohv4f7/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      const imageUrl = data.secure_url;

      setPetImageURL(imageUrl);
      setValue("imgURL", imageUrl);
    } catch (error) {
      console.error("Photo upload error:", error);
    }
  };

  const onSubmit = (data) => {
    dispatch(addPet(data));
    dispatch(refreshUser());
    navigate("/profile");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Add my pet <span>/ Personal details</span>
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <ul className={styles.genderList}>
          <li
            className={`${styles.genderItem} ${styles.femaleItem} ${
              sexPet === "female" ? styles.activeGender : ""
            }`}
            onClick={() => handleChooseSex("female")}
          >
            <svg width="20" height="20">
              <use href={`${sprite}#icon-female`}></use>
            </svg>
          </li>
          <li
            className={`${styles.genderItem} ${styles.maleItem} ${
              sexPet === "male" ? styles.activeGender : ""
            }`}
            onClick={() => handleChooseSex("male")}
          >
            <svg width="20" height="20">
              <use href={`${sprite}#icon-male`}></use>
            </svg>
          </li>
          <li
            className={`${styles.genderItem} ${styles.multipleItem} ${
              sexPet === "multiple" ? styles.activeGender : ""
            }`}
            onClick={() => handleChooseSex("multiple")}
          >
            <svg width="20" height="20">
              <use href={`${sprite}#icon-reproductive`}></use>
            </svg>
          </li>
        </ul>

        <input
          type="hidden"
          {...register("sex")}
          className={styles.hiddenInput}
        />
        {errors.sex && <p className={styles.errorText}>{errors.sex.message}</p>}

        <div className={styles.imageContainer}>
          {petImageURL ? (
            <img
              src={petImageURL}
              alt="Pet's avatar"
              className={styles.image}
            />
          ) : (
            <div className={styles.imagePlaceholder}>
              <svg width="34" height="34">
                <use href={`${sprite}#icon-foot-print`}></use>
              </svg>
            </div>
          )}
        </div>

        <div className={styles.uploadContainer}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              {...register("imgURL")}
              placeholder="Enter URL"
              className={styles.input}
            />
            {errors.imgURL && (
              <p className={styles.errorText}>{errors.imgURL.message}</p>
            )}
          </div>

          <label className={styles.uploadLabel}>
            <input
              type="file"
              accept="image/*"
              className={styles.fileInput}
              onChange={handleUploadAvatar}
            />
            <span className={styles.uploadButton}>
              Upload photo
              <svg width="16" height="16" className={styles.uploadIcon}>
                <use href={`${sprite}#icon-upload-cloud`}></use>
              </svg>
            </span>
          </label>
        </div>

        <div className={styles.inputWrap}>
          <input
            type="text"
            {...register("title")}
            placeholder="Title"
            className={styles.input}
          />
          {errors.title && (
            <p className={styles.errorText}>{errors.title.message}</p>
          )}
        </div>

        <div className={styles.inputWrap}>
          <input
            type="text"
            {...register("name")}
            placeholder="Pet's Name"
            className={styles.input}
          />
          {errors.name && (
            <p className={styles.errorText}>{errors.name.message}</p>
          )}
        </div>

        <div className={styles.boxContainer}>
          <div className={styles.datePickerWrapper}>
            <Controller
              control={control}
              name="birthday"
              render={({ field }) => (
                <DatePicker
                  selected={field.value ? new Date(field.value) : null}
                  onChange={handleDateChange}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="YYYY-MM-DD"
                  className={styles.datePicker}
                  calendarStartDay={1}
                  dayClassName={(date) => {
                    const selectedDate = field.value
                      ? new Date(field.value)
                      : new Date();
                    return date.getMonth() === selectedDate.getMonth()
                      ? undefined
                      : "react-datepicker__day--disabled";
                  }}
                />
              )}
            />
            <svg
              width="18"
              height="18"
              className={styles.calendarIcon}
              fill="none"
              stroke="#262626"
            >
              <use href={`${sprite}#icon-calendar`} />
            </svg>
            {errors.birthday && (
              <p className={styles.errorText}>{errors.birthday.message}</p>
            )}
          </div>

          <div className={styles.selectContainer}>
            <Select
              value={
                petType
                  ? {
                      value: petType,
                      label: petType.charAt(0).toUpperCase() + petType.slice(1),
                    }
                  : null
              }
              onChange={handleByType}
              options={species?.map((item) => ({
                value: item,
                label: item.charAt(0).toUpperCase() + item.slice(1),
              }))}
              placeholder="Type of pet"
              className={styles.select}
              classNamePrefix="select"
              onMenuOpen={() => setIsSelectOpen(true)}
              onMenuClose={() => setIsSelectOpen(false)}
              components={{
                IndicatorSeparator: () => null,
                DropdownIndicator: () => null,
              }}
            />
            <div
              className={`${styles.arrowIcon} ${
                isSelectOpen ? styles.arrowIconOpen : ""
              }`}
            >
              <svg width="18" height="18" fill="none" stroke="#262626">
                <use href={`${sprite}#icon-arrow-down`} />
              </svg>
            </div>
            {errors.species && (
              <p className={styles.errorText}>{errors.species.message}</p>
            )}
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            type="button"
            variant="outline"
            size="medium"
            onClick={() => navigate("/profile")}
            className={styles.backButton}
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="medium"
            className={styles.submitButton}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPetForm;
