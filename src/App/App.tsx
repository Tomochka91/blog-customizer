import { CSSProperties, useState } from 'react';
import { Article } from 'src/components/article';
import { ArticleParamsForm } from 'src/components/article-params-form';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import styles from './index.module.scss';

export const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleSetArticleState = (state: ArticleStateType) => {
		setArticleState(state);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onChangeArticle={handleSetArticleState} />

			<Article />
		</main>
	);
};
