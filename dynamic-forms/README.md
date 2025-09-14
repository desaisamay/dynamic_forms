# Dynamic Form Builder (Angular Standalone)

This project demonstrates how to dynamically render Angular Reactive Forms from a JSON schema.  
The form automatically supports validation rules such as **required** and **pattern matching**.

---

## 🚀 Steps to Run the Application

1. **Clone or create the project**
   ```bash
   git clone <your-repo-url>
   cd <project-folder>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   ng serve
   ```

4. Open your browser at:
   ```
   http://localhost:4200
   ```

---

## 📜 JSON Schema Format

The form is generated from a schema passed into the `<app-dynamic-form>` component.

Each schema looks like this:

```ts
interface FormSchema {
  title: string;
  fields: {
    name: string;                  // Unique key for the control
    label: string;                 // Label shown in the form
    type: 'text' | 'textarea' | 'date' | 'dropdown' | 'multiselect' | 'checkbox';
    required?: boolean;            // Whether the field is mandatory
    options?: string[];            // Dropdown / multiselect options
    validation?: {
      pattern?: string;            // Regex pattern for validation
      message?: string;            // Custom error message
    };
  }[];
}
```

### Supported field types
- **text** → Regular text input  
- **textarea** → Multiline text area  
- **date** → Date picker  
- **dropdown** → Single select dropdown  
- **multiselect** → Multiple select dropdown  
- **checkbox** → Boolean field  

---

## 📝 Example JSON Schema

```ts
mySchema: FormSchema = {
  title: "User Registration",
  fields: [
    { name: "firstName", label: "First Name", type: "text", required: true },
    { name: "email", label: "Email", type: "text", required: true, validation: {
        pattern: "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$",
        message: "Please enter a valid email address"
      }
    },
    { name: "dob", label: "Date of Birth", type: "date" },
    { name: "gender", label: "Gender", type: "dropdown", options: ["Male", "Female", "Other"] },
    { name: "hobbies", label: "Hobbies", type: "multiselect", options: ["Reading", "Sports", "Gaming"] },
    { name: "newsletter", label: "Subscribe to Newsletter", type: "checkbox" }
  ]
};
```

---

## ✅ Example Output

### Form UI
When rendered, the schema above generates a form with:
- First Name (text, required)  
- Email (text, required with regex validation)  
- Date of Birth (date picker)  
- Gender (dropdown)  
- Hobbies (multi-select dropdown)  
- Newsletter (checkbox)  

### Example Submission
If the user fills:

```json
{
  "firstName": "Alice",
  "email": "alice@example.com",
  "dob": "1990-05-12",
  "gender": "Female",
  "hobbies": ["Reading", "Gaming"],
  "newsletter": true
}
```

This JSON will be emitted via `(submitForm)` output event of the `DynamicFormComponent`.

---

## ⚡ Notes
- Required fields display an asterisk (`*`) and show \"Field is required\" if left empty.
- Pattern validations display a custom message if provided, otherwise \"Field is invalid\".
- Submit button is disabled until the form is valid.
