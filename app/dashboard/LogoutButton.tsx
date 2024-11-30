"use client";
import React from "react";
import { logout } from "../auth/actions";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  return <Button onClick={() => logout()}>Logout</Button>;
}
