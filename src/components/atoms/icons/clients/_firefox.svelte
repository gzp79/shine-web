<script lang="ts">
    import { sizeMaps } from '$components/types';
    import { twMerge } from 'tailwind-merge';
    import type { GlyphProps } from '../types';

    let { size = 'md', disabled = false, class: className }: GlyphProps = $props();
    let svgClass = $derived(twMerge(sizeMaps.glyph[size], className, disabled ? 'grayscale' : ''));
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 438 438" class={svgClass}>
    <defs>
        <linearGradient id="b">
            <stop offset="0" stop-color="#7f0000" stop-opacity=".5" />
            <stop offset="1" stop-color="#7d0000" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="a">
            <stop offset="0" stop-color="#fff" stop-opacity="0" />
            <stop offset="1" stop-color="#faff3a" />
        </linearGradient>
        <linearGradient id="c">
            <stop offset="0" stop-color="#ffaf00" stop-opacity=".7" />
            <stop offset="1" stop-color="#ffa732" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="f" x1="0">
            <stop offset="0" stop-color="#ffcfad" />
            <stop offset="1" stop-color="#fad7a5" />
        </linearGradient>
        <linearGradient id="g" x1="0">
            <stop offset="0" stop-color="#450000" />
            <stop offset="1" stop-color="#fa3a00" />
        </linearGradient>
        <linearGradient id="h" x1="0">
            <stop offset="0" stop-color="#ff7f00" />
            <stop offset="1" stop-color="#fa5700" />
        </linearGradient>
        <linearGradient id="p" x1="0">
            <stop offset="0" stop-color="#ee8f00" />
            <stop offset="1" stop-color="#fa3a00" />
        </linearGradient>
        <linearGradient xlink:href="#a" id="i" x1=".4" x2="1" y1=".7" y2="0" />
        <linearGradient xlink:href="#b" id="q" x1=".4" x2=".4" y1=".4" y2=".9" />
        <linearGradient xlink:href="#b" id="r" x1="0" />
        <linearGradient xlink:href="#a" id="n" x1=".8" x2=".8" y1=".6" y2="0" />
        <linearGradient xlink:href="#a" id="u" x1=".7" x2=".2" y1=".6" y2="0" />
        <linearGradient xlink:href="#a" id="t" x1=".7" x2=".7" y1=".8" y2=".1" />
        <linearGradient xlink:href="#a" id="s" x1=".5" x2=".7" y1=".4" y2="0" />
        <linearGradient xlink:href="#a" id="l" x1=".6" x2=".7" y1=".7" y2=".2" />
        <linearGradient xlink:href="#a" id="j" x1=".1" x2=".5" y1=".6" y2="0" />
        <linearGradient xlink:href="#a" id="o" x1=".7" x2=".4" y1=".7" y2=".1" />
        <linearGradient xlink:href="#a" id="m" x1=".9" x2=".4" y1=".9" y2=".2" />
        <linearGradient xlink:href="#a" id="k" x1=".3" x2=".6" y1=".7" y2=".1" />
        <linearGradient xlink:href="#a" id="v" x1=".3" x2=".6" y1="1" y2=".3" />
        <radialGradient xlink:href="#c" id="e" />
        <radialGradient xlink:href="#c" id="d" />
    </defs>
    <path
        fill="url(#d)"
        fill-rule="evenodd"
        stroke="url(#e)"
        stroke-width="1.6"
        d="M424 385c0 18-85 32-191 32S41 403 41 385s86-31 192-31 191 14 191 31z"
    />
    <path
        fill="url(#f)"
        fill-rule="evenodd"
        stroke="#b16800"
        stroke-linejoin="bevel"
        stroke-width="6.3"
        d="M179 155c12-14 28-19 40-27-5-10-33-11-42-9-6 5-26 17-36 26 15 5 22 5 38 10z"
    />
    <path
        fill="url(#g)"
        fill-rule="evenodd"
        stroke="#680000"
        stroke-linejoin="bevel"
        stroke-width="10"
        d="M168 141c11-8 34-17 41-19-27-8-44-29-47-43-19 8-37 25-33 36 10 9 26 20 38 26z"
    />
    <path
        fill="url(#h)"
        fill-rule="evenodd"
        stroke="#6b0000"
        stroke-width="10"
        d="M223 376c94 2 179-67 193-140 11-59 14-99 12-110l-12 33c2-46-10-87-30-97-2 10 3 22 9 33-13-18-18-59-105-60 17 7 20 14 29 19l-32 6c20 10 68 23 79 52l7 22-19-15c6 34 6 55 5 76-9-9-10-12-16-21 2 38-5 76-18 85-1-10 1-17 1-24-7 5-30 57-77 53s-61-18-75-26c17-5 35 2 53-12 7-5 24-15 36-14 6-7 2-17-6-23-11-3-28-5-44 4-10 5-43 4-53-10-9-14-15-30-4-31s24 3 35 7l-17-30c-7-17-15-19-12-46 5-27 18-44 27-51-17-3-40 11-52 22-5-3-14-5-22-4-9 0-17 2-23 5-10-4-19-33-22-45-16-3-28 53-23 77-8 13-28 32-24 49 5 1 8 0 14-4-10 13-16 49-4 89 20 60 87 131 190 131z"
    />
    <path fill="url(#i)" fill-rule="evenodd" d="M239 323c89-21 131-75 135-82-1 16-27 99-112 114-96 12-23-30-23-32z" />
    <path fill="url(#j)" fill-rule="evenodd" d="M336 283c58-65 52-122 50-129 11 11 52 77-7 135-71 62-42-5-44-6z" />
    <path
        fill="url(#i)"
        fill-rule="evenodd"
        d="M333 249c18-32 15-60 15-63 4 5 18 37-1 66-22 31-14-2-14-3zm51-44c32-30 41-64 41-68 2 8 4 55-27 81-36 26-14-12-14-13z"
    />
    <path fill="url(#k)" fill-rule="evenodd" d="M379 165c19-46 17-87 17-92 3 7 25 71 5 112-23 44-22-20-22-20z" />
    <path fill="url(#l)" fill-rule="evenodd" d="M358 220c12-48 4-89 3-93 4 7 42 37 28 81-16 47-31 12-31 12z" />
    <path fill="url(#m)" fill-rule="evenodd" d="M366 83c-36-34-75-47-79-49 8 0 57 4 88 38 33 37-8 11-9 11z" />
    <path fill="url(#n)" fill-rule="evenodd" d="M126 127C68 62 72 51 68 38a98 98 0 0 0 15 132c71 62 48-37 43-43z" />
    <path fill="url(#o)" fill-rule="evenodd" d="M389 167c-17-97-68-99-89-106 19-1 61-8 93 50 22 45 8 54-4 56z" />
    <path
        fill="url(#p)"
        fill-rule="evenodd"
        d="M214 321c94 2 124-71 111-62-1-10 1-17 1-24-7 5-30 57-77 53s-61-18-75-26c17-5 35 2 53-12 7-4 24-15 36-14 6-7 3-19-6-23-10-5-28-5-44 4-10 5-50 1-59-14-8-15-9-26 2-27s24 3 35 7l-26-45c-2-10-8-4-3-31s18-44 27-51c-17-3-40 11-52 22-5-3-14-5-22-4-9 0-20 3-26 6-35 17-69 63-64 80 12-10 18-5 32-15-10 13-13 64-1 91 13 31 55 85 158 85z"
    />
    <path
        fill="url(#q)"
        fill-rule="evenodd"
        d="M151 177c-32 0-48 4-48 24 0 14 29 42 46 49 14 4 3-18-3-26-10-17 1-39 5-47z"
    />
    <path
        fill="url(#r)"
        fill-rule="evenodd"
        d="M175 261c-19-12-21-23-26-32 14 7 27 12 36 13 20 0 35 4 62-9 1 3-4 7-12 14l-25 11c-14 3-21 0-35 3z"
    />
    <path fill-rule="evenodd" d="M227 122c0 5-6 9-13 9s-13-4-13-9 5-10 13-10 13 5 13 10z" />
    <path fill="url(#n)" fill-rule="evenodd" d="M101 140c1-53 28-42 24-63-20 1-36-1-69 44 13 93 33 24 45 19z" />
    <path fill="url(#s)" fill-rule="evenodd" d="M143 155c1-53 22-72 32-95-21 11-65 33-97 77 13 94 53 23 65 18z" />
    <path fill="url(#t)" fill-rule="evenodd" d="M100 252c-18-81 17-128 22-133-15 4-87 43-65 119 31 85 41 14 43 14z" />
    <path fill="url(#u)" fill-rule="evenodd" d="M196 280c-90-22-132-76-136-83 1 16 27 99 113 114 95 12 23-30 23-31z" />
    <path fill="url(#v)" fill-rule="evenodd" d="M175 226c36 8 62-10 64-11-3 5-8 34-41 25-11-3-22-8-23-14z" />
</svg>
