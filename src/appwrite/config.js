import { conf } from "../conf/conf";

class DatabaseService {

    client = new Client();
    databases;
    bucket;

    constructor() {
    this.client = new Client()
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
    }

    async createPost({ title, content, slug, featuredImage, status, userId }) {
    try {
        return await this.databases.createDocument(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            slug,
            {
                title,
                content,
                slug,
                featuredImage,
                status,
                userId
            }
        )
    } catch (error) {
        console.log("Appwrite Error :: createPost :: ", error);
    }
    }

    async updatePost(slug, { title, content, featuredImage, status}) {
    try {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            slug,
            {
                title,
                content,
                featuredImage,
                status
            }
        )
    } catch (error) {
        console.log("Appwrite Error :: updatePost :: ", error);
    }
    }

    async deletePost(slug){
    try {
        await this.databases.deleteDocument(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            slug
        )
        return true;
    } catch (error) {
        console.log("Appwrite Error :: deletePost :: ", error);
        return false;
    }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
        } catch (error) {
            console.log("Appwrite Error :: getPosts :: ", error);
        }
    }

    async getPosts(queries=[Query.equal("status", "active")]) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                queries
            )
        } catch (error) {
            console.log("Appwrite Error :: getPosts :: ", error);
        }
    }

    // upload file services

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            );
            return true;
        } catch (error) {
            console.log("Appwrite Error :: uploadFile :: ", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Appwrite Error :: uploadFile :: ", error);
            return false;
        }
    }

    previewFile(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketID,
            fileId
        )
    }
}

const dbService = new DatabaseService();

export default dbService;