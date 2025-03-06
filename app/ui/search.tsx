"use client";
import { useDebouncedCallback } from "use-debounce";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    // 3 이친구가 싱크를 맞추는 거 아니야?
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        // 3. URL과 인풋의 싱크를 맞추는 과정
        // 어떻게 맞추는 건지?
        // searchParams 는 url에 붙어있는 파라미터들이지. 받아온 값들이고. 얘네는 사용자가 검색창에 입력할 때마다 아니 동기화 작업을 하는거지
        // 그러니까 총 URL : host + path + ( parameter( ~:~ , query : userInput) )
        // 인 상태에서 여 부분은 그냥 처음 쿼리값을 defaultValue라는 곳에 저장하는 것.
        defaultValue={searchParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
