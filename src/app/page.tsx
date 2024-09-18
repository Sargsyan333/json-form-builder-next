import { promises as fs } from 'fs';
import FormBuilder from "@/app/components/FormBuilder";

export default async function Home() {
    const file = await fs.readFile(process.cwd() + '/src/app/form.json', 'utf8');
    const data = JSON.parse(file);

    return (
        <div className="flex justify-items-center justify-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-16 items-center">
            <h1 className="text-2xl">Welcome to JSON Form builder</h1>
            <FormBuilder formData={data} />
          </main>
        </div>
    );
}