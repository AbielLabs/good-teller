import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface CustomInputProps{
    
}

export const CustomInput = ({ control }: any) => {
  return (
    <FormField
      control={control}
      name="username"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="w-full">Username</FormLabel>
          <FormControl className="w-full">
            <Input placeholder="shadcn" {...field} />
          </FormControl>
          <FormDescription>This is your public display name.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
