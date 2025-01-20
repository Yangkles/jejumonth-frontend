import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import FormInput from '../FormInput';
import Button from '../Button';
const Form = ({
  onSubmit,
  submitButtonText,
  inputs,
  headerText,
  guideText,
  children,
  watchTarget,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    mode: 'onChange',
  });

  const formAdaptor = ({ register, name, input }) => {
    const { attributes, validate } = input;
    return { ...register(name, validate), ...attributes };
  };

  const formInputs = inputs(getValues);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-14">
        <div className="mb-40">
          {headerText && <h2 className="text-26 font-bold mb-18">{headerText}</h2>}
          {guideText && <p className="text-12 font-semibold">{guideText}</p>}
        </div>

        <div>
          {Object.entries(formInputs).map(([name, input]) => (
            <FormInput
              key={name}
              errorMessage={errors[name]?.message?.toString() || ''}
              props={formAdaptor({ register, name, input })}
              label={input.options.label}
              inputGuide={input.options.inputGuide}
            />
          ))}
        </div>

        <Button type="submit" label={submitButtonText} color="orange" />
      </div>
      {children}
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string.isRequired,
  inputs: PropTypes.func.isRequired,
  headerText: PropTypes.string,
  guideText: PropTypes.string,
  children: PropTypes.node,
  watchTarget: PropTypes.string,
};
export default Form;