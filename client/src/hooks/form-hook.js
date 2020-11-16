import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleChange = e => {
    e.persist();
    setValues(values => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handlerSubmit = e => {
    e.preventDefault();
    //handleErrors
    setErrors(validate(values));
    setIsSubmitting(true);
  };
  useEffect(() => {
    //check if no errors =>callback
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();

    }

  }, [errors]);

  return [values, handleChange, handlerSubmit, errors];
};
export default useForm;