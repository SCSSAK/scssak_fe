import React from 'react';
import ArticleForm from '../components/article/ArticleForm';

const ArticleEditPage = ({existingArticle}) => {
  const handleSubmit = formData => {
    console.log('게시글 수정:', formData);
    // API 호출 로직 추가
  };

  return (
    <ArticleForm
      isEditMode={true}
      // initialBoard={existingArticle.board}
      initialBoard=""
      // initialVisibility={existingArticle.visibility}
      initialVisibility="전체"
      // initialTitle={existingArticle.title}
      initialTitle=""
      // initialContent={existingArticle.content}
      initialContent=""
      onSubmit={handleSubmit}
      showImageUpload={false} // 이미지 수정은 불가능하게
    />
  );
};

export default ArticleEditPage;
