import ghost from '../assets/ghost.png'

const EmptyResults =  () => {
    return (
        <div className='py-5 text-center'>
            <h3>Sin resultados</h3>
            <img 
                src={ghost}
                alt="ghost image" 
                width={450}
            />
        </div>
    )
}

export default EmptyResults