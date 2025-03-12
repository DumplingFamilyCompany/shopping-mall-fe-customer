import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <h1>Hello, Next.js!</h1>
      <ul>
        <li>
          <Link href="/login">로그인 페이지</Link>
        </li>
        <li>
          <Link href="/about">어바웃 페이지</Link>
        </li>
      </ul>
    </div>
  );
}
