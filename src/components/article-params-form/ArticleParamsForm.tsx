import { SyntheticEvent, useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import {
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useClose } from 'src/hooks/useClose';

type ArticleParamsFormProps = {
	onChangeArticle: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	onChangeArticle,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const formRef = useRef<HTMLElement>(null);

	useClose({
		isOpen: isMenuOpen,
		onClose: () => setIsMenuOpen(false),
		rootRef: formRef,
	});

	const handleChange = (key: keyof ArticleStateType, selected: OptionType) => {
		setFormState({ ...formState, [key]: selected });
	};
	/*
	const handleFontChange = (selected: OptionType) => {
		setFormState((opts) => ({ ...opts, fontFamilyOption: selected }));
	};

	const handleFontColorChange = (selected: OptionType) => {
		setFormState((opts) => ({ ...opts, fontColor: selected }));
	};

	const handleBgColorChange = (selected: OptionType) => {
		setFormState((opts) => ({ ...opts, backgroundColor: selected }));
	};

	const handleWidthChange = (selected: OptionType) => {
		setFormState((opts) => ({ ...opts, contentWidth: selected }));
	};

	const handleFontSizeChange = (selected: OptionType) => {
		setFormState((opts) => ({ ...opts, fontSizeOption: selected }));
	};
*/
	const handleResetButton = () => {
		setFormState(defaultArticleState);
	};

	const handleSubmit = (event: SyntheticEvent) => {
		event.preventDefault();
		onChangeArticle(formState);
	};

	// Без полей ввода сабмит по Enter не работает. Пришлось включать принудительно и на костылях с помощью ИИ

	useEffect(() => {
		if (!isMenuOpen) return;

		const handleGlobalKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Enter' && !e.shiftKey) {
				// e.preventDefault();
				handleSubmit(e as unknown as SyntheticEvent);
			}
		};

		document.addEventListener('keydown', handleGlobalKeyDown);
		return () => document.removeEventListener('keydown', handleGlobalKeyDown);
	}, [isMenuOpen, formState]);

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => setIsMenuOpen((open) => !open)}
			/>
			<aside
				ref={formRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				{/* className={`${styles.container} ${isMenuOpen ? styles.container_open : ''}`}> */}

				<form className={styles.form} onSubmit={handleSubmit}>
					<Text
						as='h2'
						size={31}
						weight={800}
						fontStyle='normal'
						uppercase
						align='left'
						family='open-sans'>
						задайте параметры
					</Text>

					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder='Выберите шрифт'
						onChange={(opt) => handleChange('fontFamilyOption', opt)}
						title='шрифт'
					/>
					<RadioGroup
						name='размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(opt) => handleChange('fontSizeOption', opt)}
						title='размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						placeholder='Выберите цвет шрифта'
						onChange={(opt) => handleChange('fontColor', opt)}
						title='цвет шрифта'
					/>

					<Separator />

					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						placeholder='Выберите цвет фона'
						onChange={(opt) => handleChange('backgroundColor', opt)}
						title='цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						placeholder='Выберите ширину контента'
						onChange={(opt) => handleChange('contentWidth', opt)}
						title='ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								onChangeArticle(defaultArticleState);
								handleResetButton();
							}}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
