import React, { useState } from 'react';
import { BookFlip } from './BookFlip';
import { Language, MenuItem, PageRoute } from '../types';

interface MenuBookProps {
  lang: Language;
  onSelectDish: (item: MenuItem) => void;
  onNavigateSite?: (route: PageRoute) => void;
}

export const MenuBook: React.FC<MenuBookProps> = ({
  lang,
  onSelectDish,
  onNavigateSite,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <BookFlip
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      lang={lang}
      onSelectDish={onSelectDish}
      onNavigateSite={onNavigateSite}
    />
  );
};
