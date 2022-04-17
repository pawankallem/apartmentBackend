
const yup=require("yup");

const signup=yup.object().shape({
    firstName:yup.string().min(2,"First Name required minimum 2 characters").required("Required"),
    lastName:yup.string().min(2,"Last Name required minimum 2 characters").required("Required"),
    email:yup.string().email("Invalid Email").required("Required"),
    password:yup.string().min(2,"Password should be minimum 2 characters").required("Required"),
    gender:yup.mixed().oneOf(["male","female"])
})

const login=yup.object().shape({
    email:yup.string().email("Invalid Email").required("Required"),
    password:yup.string().min(2,"Password should be minimum 2 characters").required("Required"),

})

module.exports={signup,login}