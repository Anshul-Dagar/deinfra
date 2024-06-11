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
        toast({
          variant: "destructive",
          description: "File not selected",
        })
        return;
      }
      setLoading(true);

      const {data, error} = await supabase.storage.from('uploads').upload(`public/${file.name}`, file);

      if (data) {
        toast({
          description: "Your file is uploaded successfully.",
        })
       }
      else{
        toast({
          variant: "destructive",
          description: `${error.message}`,
        })
        }
        setLoading(false);
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-evenly p-24 bg-zinc-100">
      <h1 className="w-full text-center text-2xl sm:text-4xl text-nowrap">Data Lake File Uploader</h1>
    <main >
      <div className="grid w-full max-w-sm items-center gap-2">
      <Label htmlFor="picture">File</Label>
      <div className="flex gap-3 flex-col sm:flex-row">
        <Input id="picture" type="file" onChange={handleFileChange} accept =".csv,application/vnd.openxmlformats-oficedocument.spreadsheetml.sheet,application/vnd.ms-excel"/>
        <Button onClick={handleFileUpload} disabled={loading}>Upload</Button>
        </div>
    </div>
    </main>
    </div>
  );
}
