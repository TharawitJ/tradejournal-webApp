// - startFund? Next step : Require startFund
// - DupTradeModel? store data : throw error --> .trim().toLowerCase() then check

import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernameRegex = /^[a-zA-z0-9_^]{3,20}$/;

export const journalSchema = z
  .object({
    email: z
      .string()
      .min(2, "Must have more than 2 characters")
      .refine(
        (val: any) => emailRegex.test(val),
        "Email are require",
      ),
    username: z.string().min(2, "Username is require").refine((val:any)=>(usernameRegex.test(val))),
    password: z.string().min(4, "Password must have more than 4 characters"),
    passwordConfirm: z.string().min(1, "Confirm password"),
  })
  .refine(
    (input) =>
      input.password ===
      input.passwordConfirm /* refine check password === confirm password */,
    {
      message: "Password must be match with confirm password",
      path: ["passwordConfirm"],
    },
  )