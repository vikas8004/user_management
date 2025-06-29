import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const getValidationSchema = isEditMode => {
  let schema = Yup.object({
    name: Yup.string()
      .trim()
      .when([], {
        is: () => isEditMode,
        then: schema => schema.optional(),
        otherwise: schema => schema.required('Name is required'),
      }),

    email: Yup.string()
      .trim()
      .email('Invalid email')
      .when([], {
        is: () => isEditMode,
        then: schema => schema.optional(),
        otherwise: schema => schema.required('Email is required'),
      }),

    password: Yup.string()
      .trim()
      .min(6, 'Min 6 characters')
      .when([], {
        is: () => isEditMode,
        then: schema => schema.optional(),
        otherwise: schema => schema.required('Password is required'),
      }),
  });

  if (isEditMode) {
    schema = schema.test(
      'at-least-one',
      'At least one of name, email, or password is required',
      function (values) {
        const { name, email, password } = values || {};
        return !!(name?.trim() || email?.trim() || password?.trim());
      }
    );
  }

  return schema;
};

const UserForm = ({ initialValues, onSubmit, isEditMode }) => {
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={getValidationSchema(isEditMode)}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div>
            <label className="label">Name</label>
            <Field name="name" className="input input-bordered w-full" />
            <ErrorMessage name="name" component="p" className="text-sm text-red-500" />
          </div>

          <div>
            <label className="label">Email</label>
            <Field name="email" type="email" className="input input-bordered w-full" />
            <ErrorMessage name="email" component="p" className="text-sm text-red-500" />
          </div>

          <div>
            <label className="label">Password</label>
            <Field name="password" type="password" className="input input-bordered w-full" />
            <ErrorMessage name="password" component="p" className="text-sm text-red-500" />
          </div>

          <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">
            {isSubmitting ? 'Saving...' : isEditMode ? 'Update User' : 'Add User'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
