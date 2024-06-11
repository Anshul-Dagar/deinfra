'use client'

import { Button } from "@/components/ui/button";
import { Input} from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import supabase from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast"

export default function Home() {
  const [file, setFile] =useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast()

  const handleFileChange = (event) =>{
      setFile (event.target.files[0]);
  }

  const handleFileUpload = async () =>{
      if(!file) {
          return;
      }
      setLoading(true);

      const {data, error} = await supabase.storage.from('uploads').upload(`public/${file.name}`, file);

      if (data) {
        toast({
          description: "Your file has been uploaded successfully.",
        });
        setLoading(false);
       }
      else{
        console.log(error)
        }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="grid w-full max-w-sm items-center gap-2">
      <Label htmlFor="picture">File</Label>
      <div className="flex gap-3">
        <Input id="picture" type="file" onChange={handleFileChange} accept =".csv,application/vnd.openxmlformats-oficedocument.spreadsheetml.sheet,application/vnd.ms-excel"/>
        <Button onClick={handleFileUpload} disabled={loading}>Upload</Button>
        </div>
    </div>
    </main>
  );
}
