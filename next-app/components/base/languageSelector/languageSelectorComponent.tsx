import { GlobeEuropeAfricaIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { FunctionComponent, ReactElement } from 'react';

import IconTextButton from '../button/iconTextButton';

/**
 * Component to pick a language out of the pre-defined language options.
 *
 * @returns {ReactElement} The language selector component.
 */
const LanguageSelector: FunctionComponent = (): ReactElement => {
    /** Access to translations. */
    const { t, i18n } = useTranslation();
    /** Access to the router. */
    const router = useRouter();

    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0}>
                <IconTextButton useSecondaryColor icon={<GlobeEuropeAfricaIcon className="w-5 h-5 fill-secondary" />} text={t(i18n.language)} />
            </label>
            <ul tabIndex={0} className="mt-5 dropdown-content menu bg-base-100 border border-base-200 shadow-xl rounded-box w-52">
                <li className={`${i18n.language === 'en' && 'disabled'}`}>
                    {i18n.language !== 'en' ? (
                        <Link aria-label={t('languageButtonEnAriaLabel') ?? undefined} className="py-3 px-6 flex" href={router.asPath} locale={'en'}>
                            {t('en')}
                        </Link>
                    ) : (
                        <div className="py-3 px-6 flex">{t('en')}</div>
                    )}
                </li>
                <li className={`${i18n.language === 'de' && 'disabled'}`}>
                    {i18n.language !== 'de' ? (
                        <Link aria-label={t('languageButtonDeAriaLabel') ?? undefined} className="py-3 px-6 flex" href={router.asPath} locale={'de'}>
                            {t('de')}
                        </Link>
                    ) : (
                        <div className="py-3 px-6 flex">{t('de')}</div>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default LanguageSelector;
