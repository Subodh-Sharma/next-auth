

export default function UserProfile({params}: any){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">Profile Page <span className="bg-orange-500 text-white font-bold py-2 px-4 rounded">{params.id}</span></p>
        </div>
    )
}