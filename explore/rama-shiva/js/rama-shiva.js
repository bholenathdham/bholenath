/* =========================================================
   BHOLENATH DHAM — RAMA & SHIVA READING NAVIGATION
   Reuses the site's Shiva Purana navigation pattern.
   Inserts the navigation immediately before the footer.
========================================================= */
(function () {
  'use strict';

  const pages = [
    ['shiva-and-rama.html', 'Shiva and Rama', 'शिव और राम', 'শিব ও রাম'],
    ['rama-worships-shiva.html', 'Rama Worships Shiva', 'राम शिव की पूजा करते हैं', 'রাম শিবের পূজা করেন'],
    ['shiva-devotion-to-rama.html', "Shiva's Devotion to Rama", 'राम के प्रति शिव की भक्ति', 'রামের প্রতি শিবের ভক্তি'],
    ['hari-hara.html', 'Hari-Hara', 'हरि-हर', 'হরি-হর'],
    ['rama-and-shiva-one-divine-truth.html', 'Rama and Shiva — One Divine Truth', 'राम और शिव — एक दिव्य सत्य', 'রাম ও শিব — এক দিব্য সত্য'],
    ['rameshwaram-and-rama.html', 'Rameshwaram and Rama', 'राम और रामेश्वरम्', 'রাম ও রামেশ্বরম'],
    ['ramanathaswamy-temple.html', 'Ramanathaswamy Temple', 'रामनाथस्वामी मंदिर', 'রামনাথস্বামী মন্দির'],
    ['rama-lingam.html', 'Rama Lingam', 'राम लिंग', 'রাম লিঙ্গ'],
    ['sita-and-shiva.html', 'Sita and Shiva', 'सीता और शिव', 'সীতা ও শিব'],
    ['hanuman-rama-shiva.html', 'Hanuman, Rama and Shiva', 'हनुमान, राम और शिव', 'হনুমান, রাম ও শিব'],
    ['shiva-dhanush-and-rama.html', 'Shiva Dhanush and Rama', 'शिव धनुष और राम', 'শিব ধনু ও রাম'],
    ['rama-and-parashurama.html', 'Rama and Parashurama', 'राम और परशुराम', 'রাম ও পরশুরাম'],
    ['ravana-and-shiva.html', "Ravana's Devotion to Shiva", 'रावण की शिव-भक्ति', 'রাবণের শিব-ভক্তি'],
    ['ravana-kailash.html', 'Ravana and Kailash', 'रावण और कैलाश', 'রাবণ ও কৈলাস'],
    ['ravana-shiva-tandava.html', "Ravana's Shiva Tandava Stotram", 'रावण का शिव ताण्डव स्तोत्र', 'রাবণের শিব তাণ্ডব স্তোত্র'],
    ['rameshwaram-jyotirlinga.html', 'Rameshwaram Jyotirlinga', 'रामेश्वरम् ज्योतिर्लिंग', 'রামেশ্বরম জ্যোতির্লিঙ্গ'],
    ['rama-setu-and-shiva.html', 'Rama Setu and Shiva', 'राम सेतु और शिव', 'রাম সেতু ও শিব'],
    ['gandhamadhana-parvat.html', 'Gandhamadhana Parvat', 'गंधमादन पर्वत', 'গন্ধমাদন পর্বত'],
    ['koti-teertha.html', 'Koti Teertha', 'कोटि तीर्थ', 'কোটি তীর্থ'],
    ['sacred-places-rama-shiva.html', 'Sacred Places of Rama and Shiva', 'राम और शिव के पवित्र स्थान', 'রাম ও শিবের পবিত্র স্থান'],
    ['rama-in-shiva-purana.html', 'Rama in Shiva Purana', 'शिव पुराण में राम', 'শিব পুরাণে রাম'],
    ['shiva-in-ramayana.html', 'Shiva in Ramayana', 'रामायण में शिव', 'রামায়ণে শিব'],
    ['rama-shiva-puranic-traditions.html', 'Rama and Shiva in Puranic Literature', 'पुराणों में राम और शिव', 'পুরাণে রাম ও শিব'],
    ['ramcharitmanas-and-shiva.html', 'Ramcharitmanas and Shiva', 'रामचरितमानस और शिव', 'রামচরিতমানস ও শিব'],
    ['tulsidas-rama-shiva.html', 'Tulsidas and Rama–Shiva Devotion', 'तुलसीदास और राम–शिव भक्ति', 'তুলসীদাস ও রাম-শিব ভক্তি'],
    ['rama-nama-and-shiva.html', 'Rama Nama and Shiva', 'राम नाम और शिव', 'রাম নাম ও শিব'],
    ['shiva-mantra-and-rama-bhakti.html', 'Shiva Mantra and Rama Bhakti', 'शिव मंत्र और राम भक्ति', 'শিব মন্ত্র ও রাম ভক্তি'],
    ['rama-shiva-bhakti.html', 'Rama and Shiva Bhakti', 'राम और शिव भक्ति', 'রাম ও শিব ভক্তি'],
    ['why-shiva-loves-rama.html', 'Why Shiva Loves Rama', 'शिव राम से प्रेम क्यों करते हैं', 'শিব রামকে কেন ভালোবাসেন'],
    ['why-rama-worships-shiva.html', 'Why Rama Worships Shiva', 'राम शिव की पूजा क्यों करते हैं', 'রাম শিবের পূজা কেন করেন'],
    ['shiva-rama-kashi.html', 'Shiva and Rama in Kashi', 'काशी में शिव और राम', 'কাশীতে শিব ও রাম'],
    ['rama-shiva-north-indian-bhakti.html', 'Rama and Shiva in North Indian Bhakti', 'उत्तर भारतीय भक्ति में राम और शिव', 'উত্তর ভারতীয় ভক্তিতে রাম ও শিব'],
    ['rama-shiva-south-indian-tradition.html', 'Rama and Shiva in South Indian Tradition', 'दक्षिण भारतीय परंपरा में राम और शिव', 'দক্ষিণ ভারতীয় ঐতিহ্যে রাম ও শিব'],
    ['rama-shiva-stories.html', 'Rama–Shiva Stories for Devotees', 'भक्तों के लिए राम–शिव कथाएँ', 'ভক্তদের জন্য রাম-শিবের কাহিনি'],
    ['rama-shiva-sacred-journey.html', 'Rama–Shiva: The Complete Sacred Journey', 'राम–शिव: संपूर्ण पवित्र यात्रा', 'রাম-শিব: সম্পূর্ণ পবিত্র যাত্রা']
  ];

  const landing = {
    href: 'index.html',
    en: 'Rama & Shiva',
    hi: 'राम और शिव',
    bn: 'রাম ও শিব'
  };

  function span(cls, text, lang) {
    const el = document.createElement('span');
    el.className = cls;
    if (lang) el.setAttribute('lang', lang);
    el.textContent = text;
    return el;
  }

  function createCard(data, side) {
    const a = document.createElement('a');
    a.className = 'sp-nav-card ' + (side === 'prev' ? 'sp-prev' : 'sp-next');
    a.href = data.href;
    a.setAttribute('aria-label', (side === 'prev' ? 'Previous: ' : 'Next: ') + data.en);

    if (side === 'prev') {
      const arrow = document.createElement('div');
      arrow.className = 'sp-nav-arrow';
      arrow.textContent = '←';
      a.appendChild(arrow);
    }

    const body = document.createElement('div');
    const h3 = document.createElement('h3');
    h3.append(span('en hidden', side === 'prev' ? 'Previous Sacred Journey' : 'Next Sacred Journey'));
    h3.append(span('bn hidden', side === 'prev' ? 'পূর্ববর্তী পবিত্র যাত্রা' : 'পরবর্তী পবিত্র যাত্রা', 'bn'));
    h3.append(span('hi', side === 'prev' ? 'पिछली पवित्र यात्रा' : 'अगली पवित्र यात्रा', 'hi'));
    body.appendChild(h3);

    const p = document.createElement('p');
    p.append(span('en hidden', '📖 ' + data.en));
    p.append(span('bn hidden', '📖 ' + data.bn, 'bn'));
    p.append(span('hi', '📖 ' + data.hi, 'hi'));
    body.appendChild(p);
    a.appendChild(body);

    if (side === 'next') {
      const arrow = document.createElement('div');
      arrow.className = 'sp-nav-arrow';
      arrow.textContent = '→';
      a.appendChild(arrow);
    }
    return a;
  }

  function init() {
    const footer = document.querySelector('footer.bd-footer, footer');
    if (!footer || document.querySelector('.rs-page-nav')) return;

    const current = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    let index = pages.findIndex(p => p[0] === current);

    let prev, next;

    if (current === 'index.html' || current === '') {
      prev = {
        href: 'https://bholenathdham.in/explore/explore-shiva.html',
        en: 'Explore Shiva',
        hi: 'शिव को जानें',
        bn: 'শিব অন্বেষণ'
      };
      next = { href: pages[0][0], en: pages[0][1], hi: pages[0][2], bn: pages[0][3] };
    } else if (index >= 0) {
      if (index === 0) {
        prev = landing;
      } else {
        const p = pages[index - 1];
        prev = { href: p[0], en: p[1], hi: p[2], bn: p[3] };
      }

      if (index === pages.length - 1) {
        next = {
          href: 'https://bholenathdham.in/shiva-purana/shiva-purana.html',
          en: 'Shiva Purana',
          hi: 'शिव पुराण',
          bn: 'শিব পুরাণ'
        };
      } else {
        const n = pages[index + 1];
        next = { href: n[0], en: n[1], hi: n[2], bn: n[3] };
      }
    } else {
      return;
    }

    const section = document.createElement('section');
    section.className = 'sp-chapter-nav rs-page-nav';
    section.setAttribute('aria-label', 'Rama and Shiva reading navigation');

    const h2 = document.createElement('h2');
    h2.append(span('en hidden', 'Continue the Rama & Shiva Journey'));
    h2.append(span('bn hidden', 'রাম ও শিবের পবিত্র যাত্রা অব্যাহত রাখুন', 'bn'));
    h2.append(span('hi', 'राम और शिव की पवित्र यात्रा आगे बढ़ाएँ', 'hi'));
    section.appendChild(h2);

    const p = document.createElement('p');
    p.append(span('en hidden', 'Move through the connected Rama–Shiva library one sacred teaching at a time.'));
    p.append(span('bn hidden', 'একটি পবিত্র শিক্ষার পর আরেকটি পাঠ করে রাম-শিবের সংযুক্ত জ্ঞানযাত্রা এগিয়ে নিন।', 'bn'));
    p.append(span('hi', 'एक-एक पवित्र शिक्षा के साथ जुड़े हुए राम–शिव ज्ञान-संग्रह की यात्रा आगे बढ़ाएँ।', 'hi'));
    section.appendChild(p);

    const grid = document.createElement('div');
    grid.className = 'sp-nav-grid';
    grid.appendChild(createCard(prev, 'prev'));
    grid.appendChild(createCard(next, 'next'));
    section.appendChild(grid);

    footer.parentNode.insertBefore(section, footer);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
