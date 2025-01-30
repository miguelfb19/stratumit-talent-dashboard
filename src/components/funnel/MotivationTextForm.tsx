"use client";

import React from "react";
import { Form, Textarea, Button } from '@heroui/react';

export const MotivationTextForm = () => {
  return (
    <Form className="w-full mt-5">
        <h1 className="text-xl font-bold mb-5">Motivation Text</h1>
      <Textarea
        type="text"
        placeholder="Enter a motivation text"
        className="w-full max-h-44"
        minRows={10}
        color="primary"
        variant="faded"
      />
      <Button color="primary" variant="flat" className="mt-5 self-end">Next</Button>
    </Form>
  );
};
