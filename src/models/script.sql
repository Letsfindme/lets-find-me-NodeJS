#CREATE DATABASE letsfind;
 USE letsfind;

DROP TRIGGER IF EXISTS update_post_rate;

CREATE TRIGGER update_post_rate AFTER
UPDATE
	ON
	postrates FOR EACH ROW
	BEGIN
UPDATE
	posts
SET
	starCount = (
	SELECT
		AVG(rate)
	FROM
		postrates
	WHERE
		postrates.postId = posts.id)
WHERE
	posts.id = NEW.postId;
END;

DROP TRIGGER IF EXISTS insert_post_rate;

CREATE TRIGGER insert_post_rate AFTER
INSERT
	ON
	postrates FOR EACH ROW
UPDATE
	posts
SET
	starCount = (
	SELECT
		AVG(rate)
	FROM
		postrates
	WHERE
		postrates.postId = posts.id)
WHERE
	posts.id = NEW.postId;





#update_user_avatar
USE letsfind;

DROP TRIGGER IF EXISTS update_user_avatar;

CREATE TRIGGER update_user_avatar AFTER
UPDATE
	ON
	Avatars FOR EACH ROW
UPDATE
	postComments
SET
	imageRef = new.imageRef
WHERE
	postComments.userId = NEW.userId;