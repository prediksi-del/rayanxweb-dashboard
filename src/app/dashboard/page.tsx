"use client";
import { useState, useEffect } from "react";
import DashboardNav from "@/components/DashboardNav";
import ControlGrid from "@/components/ControlGrid";
import { Card } from "@/components/ui/Card";
import { io, Socket } from "socket.io-client"; // <-- Pastikan menggunakan titik (.) di sini
import { Smartphone, Radio, Terminal, Cpu, Search, Activity } from "lucide-react";
import { TargetDevice, NetworkLog } from "@/types";
