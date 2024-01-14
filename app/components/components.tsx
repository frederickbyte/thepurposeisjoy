'use client'

import Link from "next/link";
import { GitHubIcon, ReadCvIcon } from "./icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const mitLicenseUrl: string = 'https://opensource.org/license/mit/';
  const readCvUrl: string = 'https://read.cv/stolzle';
  const githubUrl: string = 'https://github.com/frederickbyte/thepurposeisjoy';
  return (
    <footer className='flex flex-col items-center text-sm mb-4'>
      <div className='flex flex-wrap justify-center text-sm mb-2 gap-4'>
        <Link href={readCvUrl} as={readCvUrl}>
          <ReadCvIcon />
        </Link>
        <Link href={githubUrl} as={githubUrl}>
          <GitHubIcon />
        </Link>
      </div>
      <div className='flex flex-wrap justify-center'>
        &copy; {currentYear} Andrew Stolzle &bull;&nbsp;<Link href={mitLicenseUrl} as={mitLicenseUrl} className='hover:underline underline-offset-2'>MIT License</Link>
      </div>
    </footer>
  );
}